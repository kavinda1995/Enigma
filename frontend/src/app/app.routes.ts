import{PlayerComponent } from './player/player.component';

export const routes = [
    { path: '', redirectTo: 'user', pathMatch: 'full' },
    { path: 'artists', loadChildren: './artists/artists.module#ArtistsModule' },
    { path: 'playlists', loadChildren: './playlist/playlist.module#PlaylistModule' },
    { path: 'queue', loadChildren: './queue/queue.module#QueueModule' },
    { path: 'user', loadChildren: './user/user.module#UserModule' },
    { path: 'ui', loadChildren: './ui-elements/ui-elements.module#UiElementsModule' },
    { path: 'player', component:PlayerComponent},
];
