using iText.Html2pdf;
using iText.Html2pdf.Resolver.Font;
using iText.IO.Font;
using iText.Kernel.Colors;
using iText.Kernel.Font;
using iText.Kernel.Geom;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Font;
using iText.Layout.Layout;
using iText.Layout.Properties;
using iText.Layout.Renderer;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestPdf
{
    class Program
    {
        static void Main(string[] args)
        {
            test3();
        }

        static float px2pt(float px)
        {
            return px * 72 / 96;
        }

        static void test3()
        {
            using (PdfReader reader = new PdfReader(@"d:\YT9509359907978.pdf"))
            using (PdfWriter writer = new PdfWriter(@"d:\test-t.pdf"))
            using (PdfDocument doc = new PdfDocument(reader, writer))
            {
                PdfPage page = doc.GetPage(1);
                Rectangle size = page.GetPageSize();
                Console.WriteLine(page.GetPageSize());
                Rectangle cropBox = page.GetCropBox();
                float cropHeight = px2pt(520);
                float x = px2pt(55);
                float y = px2pt(18);
                float width = px2pt(296);
                float realY = size.GetHeight() - cropHeight - y;
                cropBox.SetX(x);
                cropBox.SetY(realY);
                cropBox.SetWidth(width);
                cropBox.SetHeight(cropHeight);
                page.SetCropBox(cropBox);

                Paragraph paragraph = new Paragraph("TB0000001")
                      .SetFontSize(20)
                      .SetFixedLeading(20)
                      .SetBackgroundColor(DeviceRgb.WHITE)
                      .SetTextAlignment(TextAlignment.CENTER)
                      .SetFixedPosition(x, size.GetHeight() - y - px2pt(25), width)
                      .SetFont(PdfFontFactory.CreateFont(@"d:\font.ttf", PdfEncodings.IDENTITY_H, true));

                Canvas canvas = new Canvas(new PdfCanvas(page), page.GetPageSize());
                canvas.Add(paragraph);
                canvas.Close();


                // 绘制文字
                //PdfFont font = PdfFontFactory.CreateFont(@"d:\font.ttf", PdfEncodings.IDENTITY_H, true);
                //Paragraph p = new Paragraph("TB0000001");
                //p.SetFont(font);
                //p.SetFontSize(15);
                //p.SetFixedPosition(x, realY, width);
                //p.SetTextAlignment(iText.Layout.Properties.TextAlignment.CENTER);
                //Document document = new Document(doc);
                //document.Add(p);
            }
        }


        static void test4()
        {
            using (PdfReader reader = new PdfReader(@"d:\YT9509359907978.pdf"))
            using (PdfWriter writer = new PdfWriter(@"d:\test-t.pdf"))
            using (PdfDocument doc = new PdfDocument(reader, writer))
            {
                PdfPage page = doc.GetPage(1);
                Rectangle size = page.GetPageSize();
                Console.WriteLine(page.GetPageSize());
                Rectangle cropBox = page.GetCropBox();
                float cropHeight = px2pt(494);
                float x = px2pt(57);
                float y = px2pt(48);
                float width = px2pt(291);
                float realY = size.GetHeight() - cropHeight - y;
                cropBox.SetX(x);
                cropBox.SetY(realY);
                cropBox.SetWidth(width);
                cropBox.SetHeight(cropHeight);
                page.SetCropBox(cropBox);


                // 绘制文字
                //PdfFont font = PdfFontFactory.CreateFont(@"d:\font.ttf", PdfEncodings.IDENTITY_H, true);
                //Paragraph p = new Paragraph("TB0000001");
                //p.SetFont(font);
                //p.SetFontSize(15);
                //p.SetFixedPosition(x, realY, width);
                //p.SetTextAlignment(iText.Layout.Properties.TextAlignment.CENTER);
                //Document document = new Document(doc);
                //document.Add(p);
            }
        }


        static void test2()
        {

            PdfReader reader = new PdfReader(@"d:\201113V7BR4AA0.pdf");
            PdfDocument doc = new PdfDocument(reader, new PdfWriter(@"d:\test-t.pdf"));

            Document document = new Document(doc);


            PdfFont font = PdfFontFactory.CreateFont(@"d:\font.ttf", PdfEncodings.IDENTITY_H, true);
            Paragraph p = new Paragraph("TB中文");
            p.SetFont(font);
            p.SetFontSize(15);
            p.SetFixedPosition(100, 750, 200);

            document.Add(p);
        }
        static void test1()
        {
            FileInfo out_pdf = new FileInfo(@"d:\test.pdf");
            PdfWriter writer = new PdfWriter(out_pdf);
            //用法1 -- 使用默认参数直接转换（A4，）
            //HtmlConverter.ConvertToPdf(htmlDoc, writer);

            //用法2 -- 自定义页面大小、留白尺寸
            //PageSize a6 = PageSize.A6;
            //a6.ApplyMargins(20, 20, 20, 20, false);		//if true the rectangle will expand, otherwise it will shrink
            //pdf.SetDefaultPageSize(a6);
            PdfDocument pdf = new PdfDocument(writer);
            ConverterProperties prop = new ConverterProperties();
            FontProvider provider = new DefaultFontProvider();
            provider.AddSystemFonts();
            prop.SetFontProvider(provider);
            string html = File.ReadAllText(@"d:\test.html");
            HtmlConverter.ConvertToPdf(html, pdf, prop);
            Console.WriteLine("转化成功");
        }
    }
}
