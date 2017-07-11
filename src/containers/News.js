import React from 'react';
import NewsCard from '../components/NewsCard2';
import MobileBanner from './MobileBanner';
import '../styles/News.css';


const news = [
  {
    title: 'Estas son las causales y documentos a presentar para apelar a la gratuidad 2017',
    subtitle: 'Las fechas para justificar la solicitud estarán abiertas desde el 16 de febrero al 8 de marzo.',
    date: '16 Febrero 2017',
    author: 'Preuniversitario Pedro de Valdivia',
    body: 'El Mineduc ya entregó los resultados finales de asignación a las becas, créditos y gratuidad para los alumnos nuevos y antiguos que sean parte de la educación superior este 2017. Sin embargo, quienes quedaron fuera de la lista pueden apelar, hasta el 8 de febrero, si amerita su respectivo caso. Estas son las causales válidas y documentos que se deben presentar en las oficinas del Mineduc, para justificar la apelación según la situación del estudiante. El Mineduc confirmó además que se abrirá un nuevo proceso para completar el Formulario Único de Acreditación Socioeconómica (FUAS) desde el 16 de febrero al 20 de marzo para quienes aún no han postulado y quieren hacerlo.',
    src: '../assets/news.jpg',
  },
  {
    title: 'El doble del año pasado: Un total de 94 mil estudiantes contarán con gratuidad este 2017',
    subtitle: 'La ministra de Educación, Adriana Delpiano, aclaró que la cifra responde a la primera etapa, ya que en mayo se conocerá el número definitivo porque se abrió el proceso de apelación.',
    date: '16 Febrero 2017',
    author: 'Emol',
    body: 'SANTIAGO.- El Ministerio de Educación dio a conocer hoy la cifra de los estudiantes que serán beneficiados con la gratuidad, informando que en esta primera etapa se les asignó el beneficio a 94.871 jóvenes. "Si comparamos con el año anterior, en la misma fecha, teníamos 40 mil estudiantes con gratuidad, ahora son más de 94 mil los beneficiados", puntualizó la titular de la cartera, Adriana Delpiano. La ministra indicó que la cifra se debe, en gran medida, a la incorporación de 12 Institutos Profesionales y Centros de Formación Técnica. De los alumnos con gratuidad, 73.416 son estudiantes que ingresaron a primer año y 21.455 que estaban en cursos superiores. Respecto a esta ultima cifra, la Ministra afirmó que eran estudiantes "que no tenían ninguna ayuda estudiantil, no es que se pasaron de una a otra, es que no tenían ayuda". "Todo hace suponer que está todo en marcha, en los tiempos que dijimos que se iban a cumplir", afirmó Delpiano. Mayo cifra definitiva En tanto, la ministra subrayó que los datos entregados hoy, no son los definitivos, ya que ese número se conocerá el mes de mayo. "Sabemos que faltan muchos alumnos. El número exacto es difícil calcularlo", insistió Delpiano. La secretaria de Estado reiteró que desde este jueves, las personas que no completaron el Formulario Único de Acreditación Socioeconónmica (FUAS), podrán hacerlo hasta el 20 de marzo. Apelar También explicó que podrán hacerlo aquellos que no recibieron algunos de los beneficios del Estado -destacando que un total de 164 mil jóvenes sí tienen o gratuidad o beca o crédito-. En el caso de la gratuidad, los postulantes tendrán plazo hasta el 8 de marzo para apelar. Los documentos para este proceso deben ser entregados en un sobre cerrado, anotando en el reverso el nombre y tu Rut del estudiante. Si quien apela vive en Santiago, la dirección para entregar sus antecedentes es Fray Camilo Henríquez 262. si el estudiante es de regiones, puede presentar su documentación en las Oficinas de Partes de las Direcciones Provinciales o en las Secretarias Regionales Ministeriales (Seremias). Los papeles también pueden ser enviados por correo a la casilla 76 u 86 con los mismos datos indicados anteriormente, más el título "Apelación beneficios estudiantiles" en el sobre y dirigidos al "Departamento de Financiamiento Estudiantil, División de Educación Superior, Santiago". Al enviarlos, se debe considerar que deben llegar dentro del plazo establecido. Quienes quieran conocer los resultados deberán revisarlos en los sitios web www.gratuidad.cl y www.becasycreditos.cl ingresando sus datos.',
    src: '../assets/news-2.jpg',
  },
];

function News(props) {
  return (
    <div>
      {props.mobile ? <MobileBanner onClick={props.toggleMenu} location="news" /> : null}
      <div className={`col col-grey-desk ${props.mobile ? '' : 'padding-7'}`}>
        <NewsCard news={news[0]} n={2} />
        <NewsCard news={news[1]} n={1} />
      </div>
    </div>
  );
}

export default News;
