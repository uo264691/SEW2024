import xml.etree.ElementTree as ET


def escribir_inicio(f):
    f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    f.write('<kml xmlns="http://www.opengis.net/kml/2.2">\n')
    f.write('  <Document>\n')
    f.write('    <name>Circuito</name>\n')
    f.write('    <description>Planimetría del circuito</description>\n')
    f.write('    <Style id="yellowLineGreenPoly">\n')
    f.write('      <LineStyle>\n')
    f.write('        <color>7f00ffff</color>\n')
    f.write('        <width>4</width>\n')
    f.write('      </LineStyle>\n')
    f.write('      <PolyStyle>\n')
    f.write('        <color>7f00ff00</color>\n')
    f.write('      </PolyStyle>\n')
    f.write('    </Style>\n')


def escribir_coordenadas(f, coordenadas):
    f.write('    <Placemark>\n')
    f.write('      <name>Ruta del circuito</name>\n')
    f.write('      <styleUrl>#yellowLineGreenPoly</styleUrl>\n')
    f.write('      <LineString>\n')
    f.write('        <extrude>1</extrude>\n')
    f.write('        <tessellate>1</tessellate>\n')
    f.write('        <altitudeMode>absolute</altitudeMode>\n')
    f.write('        <coordinates>\n')
    for lon, lat, alt in coordenadas:
        f.write(f'          {lon},{lat},{alt}\n')
    f.write('        </coordinates>\n')
    f.write('      </LineString>\n')
    f.write('    </Placemark>\n')


def escribir_final(f):
    f.write('  </Document>\n')
    f.write('</kml>\n')


def generar_kml(xml_path, kml_path):
    tree = ET.parse(xml_path)
    root = tree.getroot()

    
    coordenadas = []
    for tramo in root.findall(".//tramo"):
        longitud_geo = tramo.find("longitud_geo").text
        latitud_geo = tramo.find("latitud_geo").text
        altitud = tramo.find("altitud").text
        coordenadas.append((longitud_geo, latitud_geo, altitud))


    with open(kml_path, 'w', encoding='utf-8') as f:
        escribir_inicio(f)
        escribir_coordenadas(f, coordenadas)
        escribir_final(f)

    print(f"Archivo KML generado: {kml_path}")


if __name__ == "__main__":
    xml_path = "circuitoEsquema.xml"
    kml_path = "circuito.kml"
    generar_kml(xml_path, kml_path)
