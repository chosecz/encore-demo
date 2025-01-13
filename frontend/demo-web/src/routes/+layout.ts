import type { LayoutLoad } from "./$types";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export const load: LayoutLoad = async ({ url, data, parent }) => {
  const path = url.pathname;
  const segments = path.split("/").filter(Boolean);

  // Build breadcrumbs
  const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

  let currentPath = "";
  for (const segment of segments) {
    currentPath += `/${segment}`;

    // Special case for article ID
    if (segment === "articles") {
      breadcrumbs.push({ label: "Articles", href: currentPath });
    } else if (breadcrumbs[breadcrumbs.length - 1]?.label === "Articles") {
      // This is an article detail page
      breadcrumbs.push({ label: "Article Details", href: currentPath });
    }
  }

  return {
    breadcrumbs,
    ...data,
  };
};
