---
title: Optimization Strategies and Best Practices in React Native
description: By implementing these optimization strategies, you can
  significantly improve your React Native app’s speed, memory usage, and
  responsiveness.
pubDate: 2025-02-25T12:30:00.000Z
slug: optimizing-performance-react-native
author: vaibhav-sharma
cover: src/assets/media/rob-hampson-react-native-optimization.jpg
tags:
  - typescript
  - react native
---
React Native enables developers to build cross-platform apps efficiently, but achieving optimal performance requires careful tuning. Without optimizations, React Native apps can suffer from slow rendering, memory leaks, and sluggish UI interactions, especially on lower-end devices.

In this guide, we’ll explore key performance bottlenecks and proven strategies to optimize your React Native app for a smoother user experience.

## Optimizing Rendering Performance

### Avoid Unnecessary Re-Renders with `memo` and `useCallback`

By default, React components **re-render** when their parent re-renders, which can cause performance bottlenecks.

Use `React.memo` to prevent unnecessary re-renders:

```typescript
import React, { memo } from 'react';

const ExpensiveComponent = memo(({ data }) => {
  console.log('Rendered');
  return <Text>{data}</Text>;
});
```

Use `useCallback` to avoid regenerating functions in child components:

```typescript
const handlePress = useCallback(() => {
  console.log('Button clicked');
}, []);
```

### Use `FlatList` Instead of `ScrollView` for Large Lists:

`ScrollView` renders **all items at once**, causing memory and performance issues for long lists. Instead, use `FlatList` for efficient lazy loading.

```typescript
<FlatList
  data={items}
  renderItem={({ item }) => <ItemComponent item={item} />}
  keyExtractor={(item) => item.id}
/>
```

### Use `useEffect` and `useMemo` Wisely

* **Minimize unnecessary computations** inside components with useMemo:

  ```typescript
  const computedValue = useMemo(() => expensiveCalculation(data), [data]);
  ```
* **Only re-run side effects when needed** using useEffect with dependency arrays:

  ```typescript
  useEffect(() => {
    fetchData();
  }, []); // Runs only once
  ```

## Reducing JavaScript Thread Load

### Optimize JavaScript Execution with `InteractionManager`

If you have heavy computations, move them to the background using `InteractionManager.runAfterInteractions`:

```typescript
import { InteractionManager } from 'react-native';

useEffect(() => {
  InteractionManager.runAfterInteractions(() => {
    expensiveOperation();
  });
}, []);
```

## Improving UI Performance

### Enable Hermes for Faster Startup Times

[Hermes](https://github.com/facebook/hermes/blob/main/README.md) is an optimized JavaScript engine that improves execution speed and memory usage.

On Android, enable Hermes in `android/app/build.gradle`:

```groovy
project.ext.react = [
  enableHermes: true  // Set to true
]
```

For iOS, turn the `hermes_enabled` flag to true in `ios/Podfile`:

```pod
use_react_native!(
  :path => config[:reactNativePath],
  # to enable hermes on iOS, change `false` to `true` and
then install pods
  :hermes_enabled => true
)
```

### Use Native Driver for Animations

React Native’s **JS-based animations** block the JS thread, causing lag. Enable the **native driver** to shift animations to the UI thread. You can use the native driver by specifying `useNativeDriver: true` in your animation configuration.

```typescript
Animated.timing(animatedValue, {
  toValue: 1,
  duration: 500,
  useNativeDriver: true, // Moves animations to native thread
}).start();
```

## Memory Management and Avoiding Leaks

### Use `useRef` Instead of Inline Functions in Loops

To avoid unnecessary function recreation, store the function references in a `useRef` object. `useRef` maintains a persistent object across renders, preventing unnecessary re-renders.

```typescript
import { useRef } from 'react';

const ItemList = ({ items }) => {
  const handlers = useRef({});

  return (
    <FlatList
      data={items}
      renderItem={({ item }) => {
        if (!handlers.current[item.id]) {
          handlers.current[item.id] = () => handlePress(item.id);
        }
        return <ItemComponent onPress={handlers.current[item.id]} />;
      }}
    />
  );
};
```

### Remove Unmounted Listeners

Unremoved listeners cause memory leaks. Clean up listeners in `useEffect`:

```typescript
useEffect(() => {
  const subscription = eventEmitter.addListener('event', callback);
  return () => subscription.remove(); // Cleanup
}, []);
```

## Optimizing Network and Data Fetching

### Use Pagination Instead of Fetching Everything at Once

If fetching large datasets, implement pagination:

```typescript
const fetchMoreData = () => {
  fetch(`https://api.example.com/data?page=${nextPage}`)
    .then((res) => res.json())
    .then((newData) => setData([...data, ...newData]));
};

<FlatList
  data={data}
  onEndReached={fetchMoreData}
  onEndReachedThreshold={0.5}
/>;
```

### Use `tanstack/react-query` for Caching and Background Fetching

[tanstack/react-query](https://tanstack.com/query/latest) efficiently caches data and refetches in the background, improving perceived speed.

```typescript
import React from 'react'
import { useIsFocused } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { Text } from 'react-native'

function MyComponent() {
  const isFocused = useIsFocused()

  const { dataUpdatedAt } = useQuery({
    queryKey: ['key'],
    queryFn: () => fetch(...),
    subscribed: isFocused,
  })

  return <Text>DataUpdatedAt: {dataUpdatedAt}</Text>
```

## Bundle Size Optimization

### Enable Code Splitting and Dynamic Imports

Reduce initial bundle size by **lazy-loading** components:

```typescript
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Loader />}>
  <HeavyComponent />
</Suspense>;
```

### Reduce Package Bloat

Audit and remove unnecessary libraries:

```shell
npx depcheck
```

Replace large libraries with lighter alternatives:

* `moment.js` → `date-fns`
* `lodash` → native JS functions ([You Don't Need Lodash](https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore))

## Debugging Performance Bottlenecks

### Use React Native Performance Monitors

* Enable **Perf Monitor**: `Cmd + M` (Android) or `Cmd + D` (iOS)
* Profile your app with [Flipper](https://fbflipper.com/docs/features/react-native/) and [React Native DevTools](https://reactnative.dev/docs/react-native-devtools)

### Check JS Frame Rate

Use the [FPS monitor](https://reactnative.dev/docs/performance) to check frame drops.

By following these best practices, your React Native app will run smoothly and efficiently, ensuring a better user experience across devices.
