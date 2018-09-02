import {PlayerComponent } from './player/player.component';
import { SelectComponent } from './select/select/select.component';

export const routes = [
    { path: '', redirectTo: 'user', pathMatch: 'full' },
    { path: 'artists', loadChildren: './artists/artists.module#ArtistsModule' },
    { path: 'playlists', loadChildren: './playlist/playlist.module#PlaylistModule' },
    { path: 'queue', loadChildren: './queue/queue.module#QueueModule' },
    { path: 'user', loadChildren: './user/user.module#UserModule' },
    { path: 'player', component: PlayerComponent},
    { path: 'ui', loadChildren: './ui-elements/ui-elements.module#UiElementsModule' },
    { path: 'select', component: SelectComponent}
];
