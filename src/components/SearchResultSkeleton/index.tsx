import * as React from 'react'
import {Skeleton} from '@/components/ui/skeleton'

function SearchResultSkeleton() {
  return (
    <>
      <div className="space-y-5 pt-3 pb-5 border-b last:border-none">
        <div className="space-y-3">
          <Skeleton className="w-full h-[20px] rounded-full" />
          <Skeleton className="w-40 h-[20px] rounded-full" />
        </div>
        <Skeleton className="w-64 h-[15px] rounded-full" />
      </div>

      <div className="space-y-5 pt-3 pb-5 border-b last:border-none">
        <div className="space-y-3">
          <Skeleton className="w-full h-[20px] rounded-full" />
          <Skeleton className="w-40 h-[20px] rounded-full" />
        </div>
        <Skeleton className="w-64 h-[15px] rounded-full" />
      </div>

      <div className="space-y-5 pt-3 pb-5 border-b last:border-none">
        <div className="space-y-3">
          <Skeleton className="w-full h-[20px] rounded-full" />
          <Skeleton className="w-40 h-[20px] rounded-full" />
        </div>
        <Skeleton className="w-64 h-[15px] rounded-full" />
      </div>
    </>
  )
}

export default SearchResultSkeleton
