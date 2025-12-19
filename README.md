# FeDemo

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

Tim hieu Ngrx Signal
-- Cai dat duong dan cho user va admin

Quy tac CSS:
==>BEM : BLOCK - ELEMENT - MODIFIER
Block cha lo vị trí, Block con lo hình thức

==Tong hop bug==
click label nhieu lan => o input bi giat placeholder
khi them user-select : none => text trong o input bi boi den
o input khi focus se xuat hien outline mac dinh, neu thay doi outline => nen thay doi mau` khong nen thay doi gi khac neu khong se gay vo layout

==Da lam duoc cai gi==


COLOR PALLET
text heading stone 800 sub-text stone 500

Bạn đã có Red-400 làm màu chủ đạo (Primary), bạn cần thêm các trạng thái Hover/Active.

Button Primary (Nền): Red-400 (Màu gốc của bạn).

Button Primary (Hover): Red-500.

Tại sao: Khi rê chuột vào, nút cần tối đi một chút để tạo phản hồi thị giác.

Button Primary (Active/Click): Red-600.

Button Secondary (Nền): White hoặc Transparent.

Button Secondary (Viền): Stone-300 (Nhạt hơn Stone-400 để trông thanh thoát hơn).

Button Secondary (Text): Stone-600 hoặc Stone-700.
Viền nhẹ (Subtle Borders): Stone-200.

Tại sao: Stone-400 khá đậm, thích hợp làm icon hoặc viền input khi focus. Còn để chia dòng trong bảng (table) hoặc khung bao quanh card, Stone-200 sẽ tinh tế hơn.

Nền phụ (Secondary Background): Stone-100 hoặc White.

Tại sao: Dùng cho các thẻ (Card) nổi lên trên nền Stone-50.

Màu Thành công (Success): Emerald-500.

Tại sao: Màu xanh ngọc (Emerald) phối với Stone tạo cảm giác tự nhiên (organic) rất hợp, đẹp hơn là xanh lá cây gắt (Green).

Màu Cảnh báo (Warning): Amber-400.

Tại sao: Màu hổ phách ấm áp, cùng tông nhiệt độ với Stone và Red.
