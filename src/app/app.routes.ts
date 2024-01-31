// Filename: app.routes.ts

// Angular Routes
import { Routes } from '@angular/router';

// Layout Components
import { PrivateLayoutComponent } from './layout/private-layout/private-layout/private-layout.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout/public-layout.component';

// Custom Components
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

/**
 * @description Application routes configuration using Angular Router.
 * @exports routes - Array of route configurations.
 */
export const routes: Routes = [
    // Private section with a dashboard route
    {
        path: 'dashboard',
        component: PrivateLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./pages/private/private.module').then(m => m.PrivateModule)
            }
        ]
    },
    // Public section with default and error routes
    {
        path: '',
        component: PublicLayoutComponent,
        children: [
            // Default route for the public section
            {
                path: '',
                loadChildren: () => import('./pages/public/public.module').then(m => m.PublicModule)
            },
            // Route for unauthorized access
            {
                path: 'unauthorized',
                loadComponent: () => UnauthorizedComponent
            },
            // Route for page not found
            {
                path: 'page-not-found',
                loadComponent: () => PageNotFoundComponent
            },
        ]
    },
    // Redirect any unmatched routes to the page-not-found route
    {
        path: '**',
        redirectTo: '/page-not-found',
        pathMatch: 'full'
    }
];
