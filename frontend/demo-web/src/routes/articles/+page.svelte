<script lang="ts">
  import { enhance } from "$app/forms";
  import Button from "$lib/components/Button.svelte";
  const { data, form } = $props();
</script>

<svelte:head>
  <title>Articles</title>
</svelte:head>

<div class="articles">
  <h1>
    {#if data.user}
      Articles
    {:else}
      Public Articles
    {/if}
  </h1>

  {#each data.articles as article}
    <div class="article">
      <h2>
        <a href="/articles/{article.id}">{article.title}</a>
      </h2>
      <p>{article.description}</p>
      {#if data.user?.id === article.authorId}
        <p class="status">Status: {article.status}</p>
      {/if}
    </div>
  {:else}
    <p>No articles, create your first one!</p>
  {/each}

  {#if data.user}
    <div class="create-article">
      <h2>Create New Article</h2>
      <form method="post" enctype="multipart/form-data" action="?/create" use:enhance>
        {#if form?.error}
          <p class="error">{form.error}</p>
        {/if}

        <div class="form-group">
          <label for="title">Title *</label>
          <input type="text" id="title" name="title" value={form?.title ?? ""} required />
        </div>

        <div class="form-group">
          <label for="description">Description *</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={form?.description ?? ""}
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="photo">Add photo to article</label>
          <input type="file" id="photo" name="photo" accept="image/*" />
        </div>

        <Button type="submit" variant="primary">Create Article</Button>
      </form>
    </div>
  {/if}
</div>

<style>
  .create-article {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
  }

  .create-article h2 {
    margin-top: 0;
    margin-bottom: 1.5rem;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: inherit;
    font-size: inherit;
  }

  .error {
    color: #dc3545;
    margin-bottom: 1rem;
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
