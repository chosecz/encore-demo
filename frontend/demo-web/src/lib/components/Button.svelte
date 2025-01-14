<script lang="ts">
  interface ButtonProps {
    children?: any;
    type?: "submit" | "button";
    variant?: "primary" | "secondary";
    disabled?: boolean;
    onClick?: () => void;
    [key: string]: any;
  }

  let { children, type, variant, disabled, ...rest }: ButtonProps = $props();
</script>

<button {type} {disabled} class={variant} {...rest}>
  {@render children()}
</button>

<style>
  button {
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: inherit;
  }

  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .primary {
    background: #0066cc;
    color: white;
  }

  .primary:hover:not(:disabled) {
    background: #0052a3;
  }

  .secondary {
    background: #f8f9fa;
    color: #212529;
    border: 1px solid #dee2e6;
  }

  .secondary:hover:not(:disabled) {
    background: #e9ecef;
  }
</style>
