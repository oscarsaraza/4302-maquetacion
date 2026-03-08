<script>
  import ArrowDown from "$lib/components/icons/arrow-down.svelte";
  import ArrowLeft from "$lib/components/icons/arrow-left.svelte";
  import ArrowRight from "$lib/components/icons/arrow-right.svelte";
  import ArrowUp from "$lib/components/icons/arrow-up.svelte";
  import Check from "$lib/components/icons/check.svelte";
  import Clock from "$lib/components/icons/clock.svelte";
  import Phone from "$lib/components/icons/phone.svelte";
  import Sun from "$lib/components/icons/sun.svelte";
  import Walk from "$lib/components/icons/walk.svelte";
  import Nav from "$lib/components/nav.svelte";

  let dayBoxes = [
    { id: 1, type: "empty" },
    { id: 2, type: "empty" },
    { id: 3, type: "empty" },
    { id: 4, type: "day", number: 1, icon: "check" },
    { id: 5, type: "day", number: 2, icon: "clock" },
    { id: 6, type: "day", number: 3, icon: "check" },
    { id: 7, type: "day", number: 4, icon: "check" },
    { id: 8, type: "day", number: 5, icon: "phone" },
    { id: 9, type: "day", number: 6, icon: "phone" },
    { id: 10, type: "day", number: 7, icon: "phone" },
    { id: 11, type: "day", number: 8, icon: "phone" },
    { id: 12, type: "day", number: 9, icon: "phone" },
    { id: 13, type: "day", number: 10, icon: "phone" },
    { id: 14, type: "day", number: 11, icon: "check" },
    { id: 15, type: "day", number: 12, icon: "phone" },
    { id: 16, type: "day", number: 13, icon: "phone" },
    { id: 17, type: "day", number: 14, icon: "clock" },
    { id: 18, type: "day", number: 15, icon: "phone" },
    { id: 19, type: "day", number: 16, icon: "check" },
    { id: 20, type: "day", number: 17, icon: "check" },
    { id: 21, type: "day", number: 18, icon: "check" },
    { id: 22, type: "day", number: 19, icon: "check" },
    { id: 23, type: "day", number: 20, icon: "check" },
    { id: 24, type: "day", number: 21, icon: "check" },
    { id: 25, type: "day", number: 22, icon: "check" },
    { id: 26, type: "day", number: 23, icon: "check" },
    { id: 27, type: "day", number: 24, icon: "check" },
    { id: 28, type: "day", number: 25, icon: "check" },
    { id: 29, type: "day", number: 26, icon: "check" },
    { id: 30, type: "day", number: 27, icon: "check" },
    { id: 31, type: "day", number: 28, icon: "clock" },
    { id: 32, type: "day", number: 29, icon: "clock" },
    { id: 33, type: "day", number: 30, icon: "phone" },
    { id: 34, type: "day", number: 31, icon: "clock" },
    { id: 35, type: "empty" },
  ];
</script>

<main class="min-h-screen flex flex-col gap-8 p-8 max-w-7xl mx-auto">
  <Nav />

  <div class="flex items-center justify-start gap-4">
    <Sun size="big" fill="fill-primary-500"></Sun>
    <h1>
      Buen día, <span class="text-primary-500">Usuario</span>
    </h1>
  </div>

  <div class="flex flex-row flex-wrap justify-around gap-4">
    <div class="bg-secondary-800 rounded-3xl p-6 min-w-96 flex flex-col gap-3">
      <div class="flex flex-row justify-between">
        <Clock fill="fill-primary-500"></Clock>
        <div class="text-primary-700">Este mes</div>
      </div>
      <div>Promedio de posponer</div>
      <div class="text-6xl text-center">4.2 min</div>
      <div class="flex flex-row justify-start gap-1">
        <ArrowDown fill="fill-danger"></ArrowDown>
        <span class="text-danger">+1.5%</span>
        <span>que el mes anterior</span>
      </div>
    </div>
    <div class="bg-secondary-800 rounded-3xl p-6 min-w-96 flex flex-col gap-3">
      <div class="flex flex-row justify-between">
        <Check fill="fill-primary-500"></Check>
        <div class="text-primary-700">Actual</div>
      </div>
      <div>Racha de éxitos</div>
      <div class="text-6xl text-center">12 días</div>
      <div class="flex flex-row justify-start gap-1">
        <ArrowUp fill="fill-success"></ArrowUp>
        <span class="text-success">+2</span>
        <span>que el mes anterior</span>
      </div>
    </div>
    <div class="bg-secondary-800 rounded-3xl p-6 min-w-96 flex flex-col gap-3">
      <div class="flex flex-row justify-between">
        <Walk fill="fill-primary-500"></Walk>
        <div class="text-primary-700">7 días</div>
      </div>
      <div>Rendimiento semanal</div>
      <div class="text-6xl text-center">88% éxito</div>
      <div class="flex flex-row justify-start gap-1">
        <ArrowDown fill="fill-danger"></ArrowDown>
        <span class="text-danger">+3%</span>
        <span>respecto de la semana anterior</span>
      </div>
    </div>
  </div>

  <div class="flex flex-row flex-wrap justify-between">
    <div>
      <h1>Historial de uso</h1>
      <span>Seguimiento de alarmar y actividad de dispositivos</span>
    </div>
    <div>
      <span>Mes</span>
      <div class="bg-secondary-800 rounded-3xl p-6 flex flex-row gap-6">
        <ArrowLeft fill="fill-primary-500"></ArrowLeft>
        <span>Octubre</span>
        <ArrowRight fill="fill-primary-500"></ArrowRight>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-7 gap-4 mx-auto">
    <div class="text-center text-primary-500">L</div>
    <div class="text-center text-primary-500">M</div>
    <div class="text-center text-primary-500">M</div>
    <div class="text-center text-primary-500">J</div>
    <div class="text-center text-primary-500">V</div>
    <div class="text-center text-primary-500">S</div>
    <div class="text-center text-primary-500">D</div>
    {#each dayBoxes as dayBox}
      {#if dayBox.type === "empty"}
        <div class="w-32 h-32 bg-primary-700 rounded-4xl aspect-square"></div>
      {:else if dayBox.type === "day"}
        <div
          class="w-32 h-32 bg-secondary-800 rounded-4xl p-4 aspect-square flex flex-col justify-between text-2xl text-primary-950
          {dayBox.icon === 'check' ? 'border-4 border-success' : ''}"
        >
          <span>{dayBox.number}</span>

          {#if dayBox.icon === "clock"}
            <span class="self-end">
              <Clock fill="fill-primary-500"></Clock>
            </span>
          {:else if dayBox.icon === "check"}
            <span class="self-end">
              <Check fill="fill-success"></Check>
            </span>
          {:else if dayBox.icon === "phone"}
            <span class="self-end">
              <Phone fill="fill-primary-500"></Phone>
            </span>
          {/if}
        </div>
      {/if}
    {/each}
  </div>
</main>
