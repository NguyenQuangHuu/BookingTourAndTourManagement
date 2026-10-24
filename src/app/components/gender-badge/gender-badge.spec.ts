import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenderBadge } from './gender-badge';

describe('GenderBadge', () => {
  let component: GenderBadge;
  let fixture: ComponentFixture<GenderBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenderBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(GenderBadge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
