from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm
from reportlab.lib.pagesizes import landscape, A4
from pypdf import PdfReader

OUT = Path('output/pdf')
OUT.mkdir(parents=True, exist_ok=True)
SOURCE = 'D:/Download/ID-Card-Preview.png'
CW, CH = 54*mm, 86*mm

def back(c, x, y):
    # Clip the PDF viewport to the original back artwork; leave source pixels unchanged.
    # Source image: 1720 x 1374; back bounds: (888,46)-(1720,1372).
    sx, sy = CW/832, CH/1326
    c.saveState()
    p = c.beginPath()
    p.rect(x, y, CW, CH)
    c.clipPath(p, stroke=0)
    c.drawImage(SOURCE, x-888*sx, y-2*sy, width=1720*sx, height=1374*sy)
    c.restoreState()

single = OUT/'Bawra-ID-Back.pdf'
c = canvas.Canvas(str(single), pagesize=(CW, CH))
c.setTitle('Bawra ID Card - Back - 54 x 86 mm')
back(c, 0, 0)
c.showPage()
c.save()

sheet = OUT/'Bawra-ID-Back-A4-10-Cards.pdf'
W,H = landscape(A4)
c = canvas.Canvas(str(sheet), pagesize=(W,H))
c.setTitle('Bawra ID Card Back - A4 - 10 Cards')
gap = 3*mm
left = (W - (5*CW + 4*gap))/2
bottom = (H - (2*CH + gap))/2
for row in range(2):
    for col in range(5):
        x, y = left+col*(CW+gap), bottom+row*(CH+gap)
        back(c,x,y)
        c.setStrokeColorRGB(.45,.45,.45)
        c.setLineWidth(.25)
        # Small crop marks outside the finished edges.
        for xx in (x,x+CW):
            c.line(xx,y-1.2*mm,xx,y-.3*mm)
            c.line(xx,y+CH+.3*mm,xx,y+CH+1.2*mm)
        for yy in (y,y+CH):
            c.line(x-1.2*mm,yy,x-.3*mm,yy)
            c.line(x+CW+.3*mm,yy,x+CW+1.2*mm,yy)
c.setFillColorRGB(.35,.35,.35)
c.setFont('Helvetica',7)
c.drawCentredString(W/2,6*mm,'A4 LANDSCAPE  |  10 BACK CARDS  |  54 x 86 mm  |  Print at 100% / Actual size')
c.showPage()
c.save()
for file in (single,sheet):
    reader = PdfReader(file)
    assert len(reader.pages)==1
    print(file.resolve(), reader.pages[0].mediabox)

