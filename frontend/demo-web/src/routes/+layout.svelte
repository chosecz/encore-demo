<script lang="ts">
  import "../global.css";

  let { children, data } = $props();

  const { user } = data;
</script>

<header>
  {#if user}
    <div class="user-info">
      <img src={user.picture} alt={user.name} width="32" height="32" />
      <p><span>{user.email}</span> | <a href="/logout">Logout</a></p>
    </div>
  {:else}
    <a href="/login/google">Sign in with Google</a>
  {/if}
</header>

{@render children()}

<style>
  header {
    background-color: #f8f9fa;
    padding: 1rem 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: right;
  }

  .user-info {
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
