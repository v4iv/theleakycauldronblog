import React from 'react'
import {Skeleton} from '@/components/ui/skeleton'

function SearchResultSkeleton() {
  return (
    <>
      <div className="space-y-5 border-b pb-5 pt-3 last:border-none">
        <div className="space-y-3">
          <Skeleton className="h-[20px] w-full rounded-full" />
          <Skeleton className="h-[20px] w-40 rounded-full" />
        </div>
        <Skeleton className="h-[15px] w-64 rounded-full" />
      </div>

      <div className="space-y-5 border-b pb-5 pt-3 last:border-none">
        <div className="space-y-3">
          <Skeleton className="h-[20px] w-full rounded-full" />
          <Skeleton className="h-[20px] w-40 rounded-full" />
        </div>
        <Skeleton className="h-[15px] w-64 rounded-full" />
      </div>

      <div className="space-y-5 border-b pb-5 pt-3 last:border-none">
        <div className="space-y-3">
          <Skeleton className="h-[20px] w-full rounded-full" />
          <Skeleton className="h-[20px] w-40 rounded-full" />
        </div>
        <Skeleton className="h-[15px] w-64 rounded-full" />
      </div>
    </>
  )
}

export default SearchResultSkeleton
