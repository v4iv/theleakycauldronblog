---
title: How to sync Child Transforms of a GameObject with PUN2 in Unity3D
description: Learn how to sync child transforms using Photon Unity Networking 2
  (PUN2) for smooth, optimized multiplayer game experiences.
pubDate: 2024-06-21T12:30:00.000Z
slug: sync-child-transforms-unity3d-pun2
author: eklavya-mishra
cover: src/assets/media/sync-child-transforms-unity3d-pun2-lorenzo-herrera.jpg
tags:
  - guest author
  - c#
  - game dev
---
**Photon Unity Networking v2 ([PUN2](https://www.photonengine.com/pun))**  is the `networking package` you end up using when you realize the [Unity3D](https://unity.com) project you’re working on will need:

* A **WebGL** build
* **Voice Chat** support

The alternative, **[Netcode](https://docs-multiplayer.unity3d.com/netcode/current/about/)** for `GameObjects`, the networking package provided by **Unity3D** itself, is a decent solution for sure (according to me, having worked on it for only a week). But the voice service provided by Unity - **Vivox** doesn’t support voice over **WebGL**.

The point is, **PUN2** exists and its voice service works over **WebGL**! Can you read the excitement in my words? That’s me with 5 years of **[Game Dev](https://theleakycauldronblog.com/tags/gamedev)** experience now. I’ve heard it’s only gonna get better.

Anyway, you probably know how to set up a `prefab` which will be instantiated over the internet.

Or if you don’t - that’s fine. I’ll explain. I’ll skip the steps about importing **PUN2** and the **App ID** setup. You can find that stuff anywhere. 

1. Have a prefab in your `Resources` folder.
2. Add a `PhotonView` component to your prefab’s root. Let’s assume it’s a basic *Cube*. We don’t care about syncing animations for now.
3. Now add a `PhotonTransformView` component to your alongside the `PhotonView` (i.e., on the same root). This component will be responsible for syncing our `Transform` over the network.
4. Add this code to instantiate your `prefab`:

   ```csharp
   PhotonNetwork.Instantiate(prefabPath, Vector3.zero, Quaternion.identity);
   ```
5. Here `prefabPath` would be the path to your prefab in the `Resources` folder. And the `Vector3` and `Quaternion` are your position and rotation respectively.

And that’s it. Your ***Cube*** (assuming it has a script updating its position/rotation) will reflect the changes to the other players.

There’s a catch here of course. 

Say, there’s a ***Cube*** with a script that rotates the ***Cube*** along the `Y-axis`, and there's a child of this ***Cube***, a ***Capsule***.

Now, it's fair to assume that the ***Capsule’s*** movement should also be reflected to other players over the network.

But of course, that doesn't work. SMH.

So, what do we do?

Now I’ll pay a little lip-service to the idea of adding another `PhotonView` and another `PhotonTransformView` to the child (***Capsule*** in our case). But I could never get that solution to work. Maybe it’s supposed to, maybe it’s not. 

Either way, I have a different solution.

The `PhotonTransformView` implements an interface called `IPunObservable`.

```csharp
public class PhotonTransformView : MonoBehaviour, IPunObservable
```

That’s what you wanna inherit from if you wanna share data over the`network stream`. This gives you the method — `OnPhotonSerializeView`, which gets called every time there is a change in the `stream`. This `method` also provides us with the `stream object` itself.

All we need to do is check if the stream is currently `reading` or `writing`, which is the equivalent of sending/receiving data.

One thing to note here is that the ***order*** in which the data is ***received*** is the ***same order*** in which it is ***sent***.

So here’s the gist of the idea — we handle the syncing ourselves. 

Here’s a *bad* way of doing this:

```csharp
using Photon.Pun;
using UnityEngine;

public class ChildTransformSync : MonoBehaviourPun, IPunObservable
{
	[SerializeField] private Transform childTransform;

	public void OnPhotonSerializeView(PhotonStream stream, PhotonMessageInfo info)
	{
    	if (stream.IsWriting)
    	{
        	// Send the current position and rotation to other players
        	stream.SendNext(childTransform.localPosition);
        	stream.SendNext(childTransform.localRotation);
    	}
    	else
    	{
        	// Receive the position and rotation from other players
        	childTransform.localPosition= (Vector3)stream.ReceiveNext();
        	childTransform.localRotation= (Quaternion)stream.ReceiveNext();
    	}
	}
}
```

All you gotta do with this component is:

1. Attach it to the ***Capsule***.
2. Add it to the `Observed Components` list in your parent’s (***Cube***) `PhotonView`.

Here are my issues with this script:

1. I gotta add this `component` to every `child` I need. And make sure they are observed by the parent’s `PhotonView`.
2. I’m sending the `position` for this ***Capsule*** over `stream` — an object which is never going to move. Only rotate. That too, only in the `Y-axis`. Why should I clog up the stream?
3. There is no `interpolation` for these sync ups. So, the *movement/rotation* is gonna snap all over the place.

Let’s first handle the first problem. The code handles the syncing for one child, so let's ***DRY*** it up so that it syncs up all the `Transforms` we want.

```csharp
using UnityEngine;
using Photon.Pun;

public class TransformSync: MonoBehaviourPun, IPunObservable
{
	[SerializeField] private Transform[] transforms; // Array of transforms to sync

	public void OnPhotonSerializeView(PhotonStream stream, PhotonMessageInfo info)
	{
    	if (stream.IsWriting)
    	{
        	// Send data to others
        	foreach (var t in transforms)
        	{
            	if (t != null)
            	{
                	stream.SendNext(t.position);
                	stream.SendNext(t.rotation);
                	stream.SendNext(t.localScale);
            	}
        	}
    	}
    	else
    	{
        	// Receive data
        	foreach (var t in transforms)
        	{
            	if (t != null)
            	{
                	t.position = (Vector3)stream.ReceiveNext();
                	t.rotation = (Quaternion)stream.ReceiveNext();
                	t.localScale = (Vector3)stream.ReceiveNext();
            	}
        	}
    	}
	}
}
```

Next, let's take care of the `interpolation`, by making a `struct` to hold the data we get from the stream:

```csharp
[System.Serializable]
public struct TransformData
{
    public Vector3 position;
    public Quaternion rotation;
    public Vector3 scale;

    public TransformData(Vector3 pos, Quaternion rot, Vector3 scl)
    {
   	 position = pos;
   	 rotation = rot;
   	 scale = scl;
    }
}
```

Now, let’s use an `array` of these `structs` to hold the received data from the stream instead of setting it right when it’s received.\
\
We’ll also ensure that this `array` is populated at the start with the initial positions of these `transforms`. We don’t want any goof-ups. Since, we are dealing with `structs` here, not `classes`, `struct` references(when they are not initialized in code) take up `default values` which can screw up our calculations.

Once we have the data — we can `lerp` to the network positions, instead of snapping to them.

```csharp
using UnityEngine;
using Photon.Pun;

public class TransformsSync : MonoBehaviourPun, IPunObservable
{
    [SerializeField] private Transform[] transforms; // Array of transforms to sync
    [SerializeField] private float interpolationSpeed = 10f; // Speed of interpolation

    private TransformData[] _targetTransformData; // Target transform data to interpolate towards

    void Start()
    {
   	 _targetTransformData = new TransformData[transforms.Length];
   	 for (int i = 0; i < transforms.Length; i++)
   	 {
   		 if (transforms[i] != null)
   		 {
   			 _targetTransformData[i] = new TransformData(transforms[i].position, transforms[i].rotation, transforms[i].localScale);
   		 }
   	 }
    }

    void Update()
    {
   	 if (!photonView.IsMine)
   	 {
   		 for (int i = 0; i < transforms.Length; i++)
   		 {
   			 if (transforms[i] != null)
   			 {
   				 transforms[i].position = Vector3.Lerp(transforms[i].position, _targetTransformData[i].position, Time.deltaTime * interpolationSpeed);
   				 transforms[i].rotation = Quaternion.Lerp(transforms[i].rotation, _targetTransformData[i].rotation, Time.deltaTime * interpolationSpeed);
   				 transforms[i].localScale = Vector3.Lerp(transforms[i].localScale, _targetTransformData[i].scale, Time.deltaTime * interpolationSpeed);
   			 }
   		 }
   	 }
    }

    public void OnPhotonSerializeView(PhotonStream stream, PhotonMessageInfo info)
    {
   	 if (stream.IsWriting)
   	 {
   		 // Send data to others
   		 foreach (var childTransform in transforms)
   		 {
   			 if (childTransform != null)
   			 {
   				 stream.SendNext(childTransform.position);
   				 stream.SendNext(childTransform.rotation);
   				 stream.SendNext(childTransform.localScale);
   			 }
   		 }
   	 }
   	 else
   	 {
   		 // Receive data and update target transform data
   		 for (int i = 0; i < transforms.Length; i++)
   		 {
   			 if (transforms[i] != null)
   			 {
   				 _targetTransformData[i].position = (Vector3)stream.ReceiveNext();
   				 _targetTransformData[i].rotation = (Quaternion)stream.ReceiveNext();
   				 _targetTransformData[i].scale = (Vector3)stream.ReceiveNext();
   			 }
   		 }
   	 }
    }
}
```

You might've noticed a check in the `Update method`:

```csharp
private void Update()
{
	if (!photonView.IsMine)
	{
    	...
	}
}
```

This ensures our `interpolation` will only occur for objects belonging to other clients. Of course, we’d be handling our ***Capsule*** rotation ourselves so our calculated rotations will be perfectly accurate already.

So `interpolation` is resolved. Now, all we need to do is:

1. Attach this script to the `prefab root`.
2. Fill the `transforms` list with the `Transform` components we want to sync up.
3. Get rid of any `PhotonTransformView` components — we don’t need help.
4. Add this component to the `Observed Components` list in our `PhotonView`.

Now, *technically* we have achieved, what we set out to do. You can even stop reading at this point. But, let’s see if we can handle limiting the data *sent/received* over `stream`. 

Why? Because we are ***programmers*** and we ***love optimizing things***.

Let’s first create another `struct` called `TransformSyncSettings`. This will determine which values we want to sync up. It will consist of 3 `bools` — ***x, y & z***. Each determining the `axis` we want to sync. 

This structure makes sense for *position* and *scale* but for rotations we should have an additional `w` parameter as they are `Quaternions` - though let’s stick with `Euler angles` for now.

```csharp
[System.Serializable]
public struct SyncSettings
{
	public bool x, y, z;
}
```

Let’s get rid of the `TransformData` class and rename it to `TransformSyncData`. It sounds cleaner. 

This `struct` will hold a `Transform` reference, also a `SyncSettings` references for *position*, *rotation* and *scale*, and the `3 Vectors`(`NonSerialized`) which will hold on to the network target positions for `interpolation`.

```csharp
[System.Serializable]
public struct TransformSyncData
{
	public UnityEngine.Transform transform;
	public SyncSettings positionSync;
	public SyncSettings rotationSync;
	public SyncSettings scaleSync;

	[HideInInspector] public Vector3 targetPosition;
	[HideInInspector] public Vector3 targetRotation;
	[HideInInspector] public Vector3 targetScale;

	public TransformSyncData(UnityEngine.Transform transform)
	{
    	this.transform = transform;
    	positionSync = new SyncSettings { x = true, y = true, z = true };
    	rotationSync = new SyncSettings { x = true, y = true, z = true };
    	scaleSync = new SyncSettings { x = true, y = true, z = true };
    	targetPosition = transform.position;
    	targetRotation = transform.rotation.eulerAngles;
    	targetScale = transform.localScale;
	}
}
```

Now, in our `TransformsSync` class, let’s adjust the `Start` method so we correctly initialize the positions of our synced transforms. We’ll also update the old `TransformData` array reference to be of the `TransformSyncData` type.

```csharp
[Header("Transform Sync")]
[SerializeField]
private TransformSyncData[] transformsToSync;

private void Start()
{
	for (int i = 0; i < transformsToSync.Length; i++)
	{
    	if (transformsToSync[i].transform == null) continue;

    	transformsToSync[i].targetPosition = transformsToSync[i].transform.position;
    	transformsToSync[i].targetRotation = transformsToSync[i].transform.rotation.eulerAngles;
    	transformsToSync[i].targetScale = transformsToSync[i].transform.localScale;
	}
}
```

Now, let’s take a look at our `OnPhotonSerializeView` code. 

We wanna make use of our `SyncSettings` and only *send/receive* data which is explicitly defined to be sent through the `inspector`.

This is how we’ll handle the sending:

```csharp
for (int i = 0; i < transformsToSync.Length; i++)
{
	if (transformsToSync[i].transform == null) continue;
	// Write only the necessary values based on sync settings

	if (transformsToSync[i].positionSync.x)
    	stream.SendNext(transformsToSync[i].transform.position.x);
	if (transformsToSync[i].positionSync.y)
    	stream.SendNext(transformsToSync[i].transform.position.y);
	if (transformsToSync[i].positionSync.z)
    	stream.SendNext(transformsToSync[i].transform.position.z);

	if (transformsToSync[i].rotationSync.x)
    	stream.SendNext(transformsToSync[i].transform.eulerAngles.x);
	if (transformsToSync[i].rotationSync.y)
    	stream.SendNext(transformsToSync[i].transform.eulerAngles.y);
	if (transformsToSync[i].rotationSync.z)
    	stream.SendNext(transformsToSync[i].transform.eulerAngles.z);

	if (transformsToSync[i].scaleSync.x)
    	stream.SendNext(transformsToSync[i].transform.localScale.x);
	if (transformsToSync[i].scaleSync.y)
    	stream.SendNext(transformsToSync[i].transform.localScale.y);
	if (transformsToSync[i].scaleSync.z)
    	stream.SendNext(transformsToSync[i].transform.localScale.z);
}
```

And this, is how we’ll read that data:

```csharp
for (int i = 0; i < transformsToSync.Length; i++)
{
	if (transformsToSync[i].transform == null) continue;

	// Read only the necessary values based on sync settings
	Vector3 receivedPosition = new Vector3(
    	transformsToSync[i].positionSync.x
        	? (float)stream.ReceiveNext()
        	: transformsToSync[i].transform.position.x,
    	transformsToSync[i].positionSync.y
        	? (float)stream.ReceiveNext()
        	: transformsToSync[i].transform.position.y,
    	transformsToSync[i].positionSync.z
        	? (float)stream.ReceiveNext()
        	: transformsToSync[i].transform.position.z
	);

	transformsToSync[i].targetPosition = receivedPosition;

	Vector3 receivedRotation = new Vector3(
    	transformsToSync[i].rotationSync.x
        	? (float)stream.ReceiveNext()
        	: transformsToSync[i].transform.eulerAngles.x,
    	transformsToSync[i].rotationSync.y
        	? (float)stream.ReceiveNext()
        	: transformsToSync[i].transform.eulerAngles.y,
    	transformsToSync[i].rotationSync.z
        	? (float)stream.ReceiveNext()
        	: transformsToSync[i].transform.eulerAngles.z
	);
	transformsToSync[i].targetRotation = receivedRotation;

	Vector3 receivedScale = new Vector3(
    	transformsToSync[i].scaleSync.x
        	? (float)stream.ReceiveNext()
        	: transformsToSync[i].transform.localScale.x,
    	transformsToSync[i].scaleSync.y
        	? (float)stream.ReceiveNext()
        	: transformsToSync[i].transform.localScale.y,
    	transformsToSync[i].scaleSync.z
        	? (float)stream.ReceiveNext()
        	: transformsToSync[i].transform.localScale.z
	);

	transformsToSync[i].targetScale = receivedScale;
}
```

Moving on to `interpolation`, we want to make sure we only interpolate the values which we have explicitly stated to be *sent/received* making use of the `SyncSettings` bools.

```csharp
for (int i = 0; i < transformsToSync.Length; i++)
{
	if (transformsToSync[i].transform == null) continue;

	TransformSyncData data = transformsToSync[i];

	Vector3 currentPos = data.transform.position;
	Vector3 currentRot = data.transform.eulerAngles;
	Vector3 currentScale = data.transform.localScale;

	float t = Time.deltaTime * PhotonNetwork.SerializationRate;

	// Interpolate position if required
	if (data.positionSync.x)
	{
    	currentPos.x = Mathf.Lerp(currentPos.x, data.targetPosition.x, t);
	}

	if (data.positionSync.y)
	{
    	currentPos.y = Mathf.Lerp(currentPos.y, data.targetPosition.y, t);
	}

	if (data.positionSync.z)
	{
    	currentPos.z = Mathf.Lerp(currentPos.z, data.targetPosition.z, t);
	}

	// Interpolate rotation if required
	if (data.rotationSync.x)
	{
    	currentRot.x = Mathf.LerpAngle(currentRot.x, data.targetRotation.x, t);
	}

	if (data.rotationSync.y)
	{
    	currentRot.y = Mathf.LerpAngle(currentRot.y, data.targetRotation.y, t);
	}

	if (data.rotationSync.z)
	{
    	currentRot.z = Mathf.LerpAngle(currentRot.z, data.targetRotation.z, t);
	}

	// Interpolate scale if required
	if (data.scaleSync.x)
	{
    	currentScale.x = Mathf.Lerp(currentScale.x, data.targetScale.x, t);
	}

	if (data.scaleSync.y)
	{
    	currentScale.y = Mathf.Lerp(currentScale.y, data.targetScale.y, t);
	}

	if (data.scaleSync.z)
	{
    	currentScale.z = Mathf.Lerp(currentScale.z, data.targetScale.z, t);
	}

	// Update transform
	data.transform.position = currentPos;
	data.transform.eulerAngles = currentRot;
	data.transform.localScale = currentScale;
}
```

You’ll notice I’ve gotten rid of the `interpolationSpeed` factor here, instead opting for `PhotonNetwork.SerializationRate`. I took that cue from the original `PhotonTransformView` class. 

Can I explain more about it? No, I can’t.

Now, in the inspector add the ***Cube*** and the ***Capsule*** to the `transformsToSync` list. And, adjust the `SyncSettings` booleans to your heart’s content.

Finally, at long last, we are done. Really done! 100% absolutely ....

Yeah, there’s an issue.

If you run a build with this code you’ll notice that if the **Host’s *Capsule*** rotated somewhat before a **Client** joined — the joining **Client** would only see the *default rotation* set in the `prefab` itself. Any *updates* to the rotation afterwards will *reflect perfectly* on the client but that initial situation is an *issue*.

Riddle me this: which got called first `Update` or `OnPhotonSerializeView`?

That’s right. It’s *unclear*. On some machines, maybe `Update` got called first, on others, maybe it was `OnPhotonSerializeView`. They are not linked; one is never guaranteed to be called after the other.

So let’s be **responsible programmers** and handle that initial situation. All we gotta do is make sure our updates, i.e., our `interpolation`, only happens once we have started receiving data over the network.

I’m sure you can figure out how to do that... 😉
