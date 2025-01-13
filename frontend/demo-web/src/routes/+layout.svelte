<script lang="ts">
  import "../global.css";

  let { children, data } = $props();

  const { user } = data;
</script>

{#if user}
  <p>User: {user.email} | <a href="/logout">Logout</a></p>
{:else}
  <a href="/login/google">Sign in with Google</a>
{/if}

{@render children()}
