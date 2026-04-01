import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function ProductCardSkeleton({ count = 1 }) {
  return Array.from({ length: count }).map((_, i) => (
    <div className="plp__card" key={i} aria-hidden="true">
      <div className="plp__card-img-wrap">
        <Skeleton height={200} borderRadius={8} />
      </div>
      <div className="plp__card-body" style={{ padding: "1rem" }}>
        <Skeleton width="35%" height={11} />
        <Skeleton
          width="85%"
          height={15}
          style={{ marginTop: "0.4rem", marginBottom: "0.4rem" }}
        />
        <Skeleton width="50%" height={13} />
        <Skeleton
          width="30%"
          height={20}
          style={{ marginTop: "0.5rem" }}
        />
        <Skeleton width="55%" height={12} style={{ marginTop: "0.4rem" }} />
      </div>
    </div>
  ));
}

export function ProductPageSkeleton() {
  return (
    <div className="pdp" aria-hidden="true" style={{ padding: "2rem" }}>
      <Skeleton width="40%" height={14} style={{ marginBottom: "1.5rem" }} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 0.8fr",
          gap: "2rem",
        }}
      >
        <div>
          <Skeleton height={400} borderRadius={8} />
        </div>
        <div>
          <Skeleton width="90%" height={24} />
          <Skeleton
            width="40%"
            height={14}
            style={{ marginTop: "0.75rem" }}
          />
          <Skeleton
            width="30%"
            height={14}
            style={{ marginTop: "0.5rem" }}
          />
          <Skeleton
            width="25%"
            height={28}
            style={{ marginTop: "1rem" }}
          />
          <Skeleton count={4} style={{ marginTop: "0.5rem" }} />
        </div>
        <div>
          <Skeleton height={300} borderRadius={8} />
        </div>
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
