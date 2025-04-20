import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestArtistComponent } from './suggest-artist.component';

describe('SuggestArtistComponent', () => {
  let component: SuggestArtistComponent;
  let fixture: ComponentFixture<SuggestArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestArtistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
