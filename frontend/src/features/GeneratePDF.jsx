import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { callAddFont } from "../fonts/OpenSans.js";
import { DateForm } from "./DateForm";
jsPDF.API.events.push(["addFonts", callAddFont]);
const GeneratePDF = (
  invoiceItems,
  customerName,
  phone,
  address,
  invoiceDate
) => {
  console.log(invoiceItems);
  const doc = new jsPDF();

  doc.setFont("OpenSans");

  // Set font size and add centered text
  const title = "Cửa hàng vật liệu xây dựng Nghĩa Ngân";
  const titleFontSize = 22; // Adjust font size as needed
  doc.setFontSize(titleFontSize);

  const pageWidth = doc.internal.pageSize.width;
  const textWidth = doc.getTextWidth(title);
  const textX = (pageWidth - textWidth) / 2; // Center horizontally

  doc.text(title, textX, 10);

  //Set the address of the store
  const storeAddress = "Phù Cầm - Dũng Liệt - Yên Phong - Bắc Ninh";
  const addressFontSize = 12;
  doc.setFontSize(addressFontSize);
  const textWidthAddress = doc.getTextWidth(storeAddress);
  const textXAddress = (pageWidth - textWidthAddress) / 2;
  doc.text(storeAddress, textXAddress, 20);
  //Set the phone number of the store
  const phoneNumber = "SĐT: 0943 700 258 - 0982 592801";
  const textWidthPhoneNumber = doc.getTextWidth(phoneNumber);
  const textXPhoneNumber = (pageWidth - textWidthPhoneNumber) / 2;
  doc.text(phoneNumber, textXPhoneNumber, 30);
  // Reset font size for other text
  doc.setFontSize(12);
  doc.text(`Tên khách hàng : ${customerName}`, 20, 40);
  doc.text(`Số điện thoại: ${phone}`, 130, 40);
  doc.text(`Địa chỉ: ${address}`, 20, 50);
  doc.text(`Ngày lập hóa đơn: ${DateForm(invoiceDate)}`, 130, 50);
  doc.autoTable({
    startY: 60,
    head: [["Tên sản phẩm", "Số lượng", "Đơn giá", "Thành tiền"]],
    body: invoiceItems.map((item) => [
      item.product,
      item.quantity,
      item.price,
      item.total,
    ]),
    styles: { font: "OpenSans" },
  });

  const totalAmount = invoiceItems.reduce((sum, item) => sum + item.total, 0);
  doc.text(`Tổng tiền: ${totalAmount}`, 20, doc.lastAutoTable.finalY + 10);

  doc.save("invoice.pdf");
};

export default GeneratePDF;
