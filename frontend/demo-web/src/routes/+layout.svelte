<script lang="ts">
  import "../global.css";

  let { children, data } = $props();

  let user = $derived(data.user);
  let breadcrumbs = $derived(data.breadcrumbs);
</script>

<header>
  <nav class="breadcrumbs">
    {#each breadcrumbs as crumb, i}
      {#if i > 0}
        <span class="separator">/</span>
      {/if}
      <a href={crumb.href}>{crumb.label}</a>
    {/each}
  </nav>
  <div class="auth">
    {#if user}
      <div class="user-info">
        <img src={user.picture} alt={user.name} width="32" height="32" />
        <p><span>{user.email}</span> | <a href="/logout">Logout</a></p>
      </div>
    {:else}
      <a href="/login/google">Sign in with Google</a>
    {/if}
  </div>
</header>

<div class="container">
  {@render children()}
</div>

<style>
  .container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  header {
    background-color: #f8f9fa;
    padding: 1rem 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .breadcrumbs {
    font-size: 0.9rem;
  }

  .breadcrumbs a {
    color: #0066cc;
    text-decoration: none;
  }

  .breadcrumbs a:hover {
    text-decoration: underline;
  }

  .separator {
    color: #666;
    margin: 0 0.5rem;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  img {
    border-radius: 50%;
    object-fit: cover;
  }

  header p {
    margin: 0;
    font-size: 0.9rem;
  }

  header span {
    color: #666;
  }
</style>
