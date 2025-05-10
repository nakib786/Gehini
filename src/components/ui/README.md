# UI Components

## NotFound Component

The NotFound component is a stylish 404 page that can be used when a user navigates to a non-existent route. It includes a functional search form and navigation buttons.

### Usage

```tsx
import { NotFound, Illustration } from "@/components/ui/not-found";

function ErrorPage() {
  return (
    <div className="relative flex flex-col w-full justify-center min-h-svh bg-background p-6 md:p-10">
      <div className="relative max-w-5xl mx-auto w-full">
        <Illustration className="absolute inset-0 w-full h-[50vh] opacity-[0.04] dark:opacity-[0.03] text-foreground" />
        <NotFound
          title="Custom Error Title"
          description="Custom error message that explains what happened."
          searchPath="/search"
          homePath="/"
        />
      </div>
    </div>
  );
}
```

### Props

#### NotFound Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | "Page not found" | The title displayed on the error page |
| description | string | "Lost, this page is. In another system, it may be." | The description text below the title |
| searchPath | string | "/search" | The path to navigate to when the search form is submitted |
| homePath | string | "/" | The path to navigate to when "Take me home" button is clicked |

#### Illustration Component

The Illustration component accepts all standard SVG props.

### Features

- **Search Functionality**: The search form will navigate to the specified searchPath with the search query as a URL parameter.
- **Go Back Button**: Clicking this button will navigate back to the previous page in the browser history.
- **Take Me Home Button**: Clicking this button will navigate to the specified homePath.

### Example

To see a live example, visit any non-existent route in the application, or view the `NotFoundPage.tsx` file. 