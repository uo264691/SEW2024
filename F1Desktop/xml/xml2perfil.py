import xml.etree.ElementTree as ET


def generar_svg(xml, svg):

    tree = ET.parse(xml)
    root = tree.getroot()


    distancias = []
    altitudes = []


    distancia_acumulada = 0

    for tramo in root.findall(".//tramo"):
        distancia = float(tramo.attrib['distancia'])
        altitud = float(tramo.find("altitud").text)

        distancia_acumulada += distancia
        distancias.append(distancia_acumulada)
        altitudes.append(altitud)


    ancho = 1000 
    alto = 500   
    margen = 50


    max_distancia = max(distancias)
    max_altitud = max(altitudes)

    escala_x = (ancho - 2 * margen) / max_distancia
    escala_y = (alto - 2 * margen) / max_altitud

    puntos = []
    for i in range(len(distancias)):
        x = margen + distancias[i] * escala_x
        y = alto - margen - altitudes[i] * escala_y
        puntos.append(f"{x},{y}")


    with open(svg, "w", encoding="utf-8") as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        f.write('<svg xmlns="http://www.w3.org/2000/svg" ')
        f.write(f'width="{ancho}" height="{alto}" viewBox="0 0 {ancho} {alto}">\n')
        

        f.write(f'<rect width="{ancho}" height="{alto}" fill="#f0f0f0"/>\n')


        f.write(f'<line x1="{margen}" y1="{alto - margen}" x2="{ancho - margen}" y2="{alto - margen}" stroke="black" />\n')
        f.write(f'<line x1="{margen}" y1="{alto - margen}" x2="{margen}" y2="{margen}" stroke="black" />\n')


        f.write(f'<polyline points="{" ".join(puntos)}" ')
        f.write('fill="none" stroke="blue" stroke-width="2"/>\n')


        f.write(f'<polyline points="{margen},{alto - margen} {" ".join(puntos)} {distancias[-1] * escala_x + margen},{alto - margen}" ')
        f.write('fill="lightblue" opacity="0.5"/>\n')

        f.write('<text x="10" y="20" font-size="14" fill="black">Perfil de Altimetría del Circuito</text>\n')

        f.write('</svg>')

    print(f"Archivo SVG generado: {svg}")


if __name__ == "__main__":
    xml = "circuitoEsquema.xml"
    svg = "altimetria.svg"
    generar_svg(xml, svg)
