<script lang="ts">
  import Icon from "$lib/components/icons/settings.svelte";
  import QrCode from "$lib/components/qr-code.svelte";
  import TextButton from "$lib/components/text-button.svelte";
</script>

<main class="min-h-screen flex flex-col gap-8 p-8 max-w-7xl mx-auto">
  <div class="flex items-center justify-center w-full mx-auto">
    <div
      class="bg-secondary-800 w-lg rounded-3xl p-12 flex flex-col gap-8 items-center"
    >
      <h1>
        ¡Hola! <span class="text-primary-500">Escanea</span> para entrar
      </h1>

      <div class="flex items-center justify-center gap-2 w-full">
        <Icon fill="fill-primary-500"></Icon>

        <span class="text-sm tracking-wide text-[#B3ACA0]"
          >Abre la aplicación en tu dispositivo móvil y apunta a la pantalla</span
        >
      </div>

      <a href="/">
        <div class="w-64 h-64">
          <QrCode />
        </div>
      </a>

      <TextButton>Refrescar código</TextButton>
    </div>
  </div>
</main>
