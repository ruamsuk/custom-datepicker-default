import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CustomDatepickerComponent } from './custom-datepicker.component';

@Component({
  selector: 'app-datepicker-demo',
  imports: [
    CustomDatepickerComponent, SharedModule
  ],
  template: `
    <div class="flex justify-center items-center my-5">
      <h1 class="text-xl md:text-2xl text-amber-400 font-nato-loop">
        ตัวอย่างการใช้งาน Datepicker
      </h1>
    </div>
    <app-custom-datepicker
      [selectedYearInput]="year"
      [selectedMonthInput]="month"
      (dateSelected)="onDateSelected($event)">
    </app-custom-datepicker>
    @if (dateSelected) {
      <div class="flex justify-center items-center my-3">
        <p-message severity="success" icon="pi pi-check-circle" closable styleClass="mb-2">
          <span class="text-indigo-300">{{ dateSelected.day }}/{{ dateSelected.month }}/{{ dateSelected.year }}</span>
        </p-message>
      </div>
    }
    <div class="flex justify-center items-center my-5 px-5">
      <p-panel header="วิธีใช้งาน" class="w-full md:w-1/2">
        <p class="m-0 font-leera text-lg md:text-xl text-indigo-200">
          เป็น Component ที่สร้างขึ้นเพื่อให้ผู้ใช้สามารถเลือกวันที่ได้อย่างสะดวกมากขึ้น โดยมีการเลือกปี เดือน และวันจาก
          Dropdown มีการแสดงผลเป็นปี พ.ศ. (พุทธศักราช) และเดือนในภาษาไทย.
        </p>
        <p class="m-0 font-leera text-lg md:text-xl text-indigo-200">
          จะประกอบไปด้วย.-
        <div class="mx-10 mb-2">
          <ul class="list-disc list-inside text-lg md:text-xl text-indigo-200">
            <li>custom-datepicker.component.ts</li>
            <li>date.service.ts</li>
          </ul>
        </div>
        <p class="m-0 font-leera text-lg md:text-xl text-indigo-200">
          โดยมีการใช้ PrimeNG ในการสร้าง Dropdown วิธีการใช้งานคือ
        <ul class="list-disc list-inside font-leera text-lg md:text-xl text-indigo-200">
          <li>นำเข้า custom-datepicker-default ที่สร้างขึ้นในไฟล์ที่ต้องการใช้งาน</li>
          <li>ใช้ Component ใน Template ของไฟล์นั้นๆ</li>
          <li>รับ - ส่ง ค่าระหว่างกันด้วย &#64;Input() และ &#64;Output()</li>
          <li>กำหนดค่าเริ่มต้นของปีและเดือนที่ต้องการให้แสดงใน Dropdown</li>
          <li>ใช้ EventEmitter เพื่อส่งค่าปี เดือน และวันที่เลือกกลับไปยัง Parent Component</li>
        </ul>
        <p class="my-2 font-leera text-lg md:text-xl text-indigo-200">
          กรณีนี้เป็นการใช้กรอกวันเดือนปีเกิด ซึ่งช่วยอำนวยความสะดวกให้กับผู้ใช้ในการกรอกข้อมูลวันเดือนปีเกิด
          โดยไม่ต้องพิมพ์เองและสามารถเลือกได้จาก Dropdown ที่มีให้เลือก ทำให้ไม่ต้องเกิดข้อผิดพลาดในการกรอกข้อมูล
          กรณีที่ผู้ใช้ไม่รู้ว่าต้องกรอกวันเดือนปีเกิดในรูปแบบไหน
        </p>
        <p class="my-2 font-leera text-lg md:text-xl text-indigo-300">
          ปรับปรุงให้เลือกวันเดือนปี ตามลำดับได้ จากนั้นระบบจะตรวจสอบว่าวันที่กรอกเข้ามานั้นถูกต้องหรือไม่
          โดยดูจากเดือนและปีที่เลือก สามารถเลือกอะไรก่อนก็ได้ ระบบจะตรวจสอบให้ว่าเลือก วันเดือนปี ครบแล้วหรือยัง
          ถ้าครบแล้วถึงจะประมวลผล
        </p>
        <div class="my-2">
          <hr class="h-px bg-gray-200">
        </div>
        <p class="my-2 font-leera text-lg md:text-xl text-amber-200">
          ส่วนการกรอกวันเดือนปีอย่างอื่นๆ สามารถใช้ UI Datepicker ของ PrimeNG ได้เลย
        </p>
      </p-panel>
    </div>
  `,
  styles: `
  `
})
export class DatepickerDemoComponent {
  /** ตัวอย่าง */
    // firestore = inject(Firestore);

  year!: number | null;
  month!: number | null;
  dateSelected!: { year: number; month: number; day: number };

  constructor() {
    this.dateSelected = {year: 0, month: 0, day: 0};
  }

  /**
   * Date Selected Event
   * @param date - The selected date object containing year, month, and day
   * */
  onDateSelected(date: { year: number; month: number; day: number }) {
    console.log('Date Selected: ', date);
    const formattedDate = this.formatDateForFirestore(date);
    console.log('Formatted Date:', formattedDate);

    this.dateSelected = formattedDate;
    // บันทึกลง Firestore
    this.saveToFirestore(formattedDate);
  }

  formatDateForFirestore(date: { year: any, month: any, day: number }): { year: number, month: number, day: number } {
    return {
      year: date.year.value - 543, // แปลงพุทธศักราชเป็นคริสตศักราช
      month: date.month.value,     // เดือนที่ถูกเลือก
      day: date.day                // วันที่ถูกเลือก
    };
  }

  private saveToFirestore(date: { year: number; month: number; day: number }) {
    const firestoreData = {
      ...date,
      timestamp: new Date(date.year, date.month - 1, date.day).toISOString() // เพิ่ม Timestamp สำหรับการจัดเก็บใน Firestore
    };
    /**
     * ตัวอย่าง วิธีบันทึกข้อมูลลง Firestore
     * ควรจะใช้เมธอดบันทึกข้อมูลลง Firestore
     * ใน Service แทน และจะมีข้อมูลอื่นอีก ไม่้ฉพาะ date
     * * เพื่อให้โค้ดมีความสะอาดและแยกความรับผิดชอบ
     * */
    // ใช้ Service ที่สร้างขึ้นเพื่อบันทึกข้อมูล
    // this.accountService.addAccount(firestoreData).subscribe(response => {
    //   console.log('Data saved to Firestore:', response);
    // });
    // เมธอดใน Service -------
    // addAccount(account: any) {
    //  const ref = collection(this.firestore, 'your-collection-name');
    //  return from(addDoc(ref, firestoreData));  // return observable, because I love it!
    //  }

  }
}
