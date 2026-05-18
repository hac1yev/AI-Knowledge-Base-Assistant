import mammoth from 'mammoth';
import { PDFParse } from 'pdf-parse';

export async function extractFileContent(file: Express.Multer.File) {
  switch (file.mimetype) {
    case 'text/plain':
      return file.buffer.toString('utf-8');

    case 'application/pdf':
      const parser = new PDFParse({ data: file.buffer });
      const pdfData = await parser.getText();
      return pdfData.text;
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      const result = await mammoth.extractRawText({
        buffer: file.buffer,
      });

      return result.value;
    default:
      return 'Unsupported file';
  }
}
