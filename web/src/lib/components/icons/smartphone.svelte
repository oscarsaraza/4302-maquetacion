<script lang="ts">
  import type { IconSize } from "./types";

  let { fill = "currentColor", size = "small" } = $props<{
    fill?: string;
    size?: IconSize;
  }>();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size === "small" ? "24" : "72"}
  height={size === "small" ? "24" : "72"}
  viewBox="0 0 24 24"
  fill="#2a2415"
>
  <path
    class={fill}
    d="M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3m1 17H7V4h10zM12 21a1 1 0 1 1 0-2a1 1 0 0 1 0 2"
  />
</svg>
