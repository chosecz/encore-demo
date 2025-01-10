<script lang="ts">
  const { data } = $props();
</script>

<svelte:head>
  <title>Articles</title>
</svelte:head>

<div class="articles">
  <h1>Articles</h1>

  {#each data.articles as article}
    <div class="article">
      <h2>
        <a href="/articles/{article.id}">{article.title}</a>
      </h2>
      <p>{article.description}</p>
      <p class="status">Status: {article.status}</p>
    </div>
  {/each}
</div>

<style>
  .articles {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  .article {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
  }

  .article h2 {
    margin: 0 0 1rem 0;
  }

  .article h2 a {
    color: #0066cc;
    text-decoration: none;
  }

  .article h2 a:hover {
    text-decoration: underline;
  }

  .article p {
    margin: 0.5rem 0;
    line-height: 1.4;
  }

  .status {
    color: #666;
    font-size: 0.9rem;
  }
</style>
