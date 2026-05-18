import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordTypePie } from './word-type-pie';

describe('WordTypePie', () => {
  let component: WordTypePie;
  let fixture: ComponentFixture<WordTypePie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordTypePie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordTypePie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
