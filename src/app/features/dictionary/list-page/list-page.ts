import {Component, DestroyRef, inject, OnInit, signal,computed} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DictionaryApi} from '../../../core/dictionary-api.service.';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {VocabItem} from '../../../core/models';
import {debounceTime, Subject, switchMap} from 'rxjs';

@Component({
  imports: [],
  selector: 'app-list-page',
  styleUrl: './list-page.css',
  templateUrl: './list-page.html',
  standalone: true
})
export class ListPage implements OnInit {
  private readonly api  = inject(DictionaryApi)
  private readonly destroyRef = inject(DestroyRef)
  private loading = signal(false)
  private readonly page = signal(1)
  private readonly size = signal(20)
  private readonly message = signal('')
  private readonly query$ = new Subject<string>()
  readonly vocabs = signal<VocabItem[]>([])
  readonly draftCount = computed(()=> this.vocabs().filter(x=>x.state==="DRAFT").length)
  constructor(){
    this.query$.pipe(
      debounceTime(300),//đợi 300ms để phát event nếu xảy ra thay đổi ở query
      switchMap(()=>{
        this.loading.set(true);
        return this.api.list(this.page(),this.size())
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(
      {
        next: value => {this.vocabs.set(value.items);this.loading.set(false);},
        error: () => {this.message.set('không tải được dữ liệu');this.loading.set(false)}
      }
    )
  }
  ngOnInit(){
    this.api.list().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      page => this.vocabs.set(page.items)
    )
  }
}
