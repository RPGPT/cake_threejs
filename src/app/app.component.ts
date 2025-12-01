import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CakeViewerComponent } from './cake-viewer/cake-viewer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CakeViewerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
