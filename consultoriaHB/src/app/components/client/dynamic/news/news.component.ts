import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  totalRecords: String;
  page: Number= 1;
  noticias:any[];

  constructor() { 
    this.noticias=[
      {
        titulo:'Derecho Ambiental',
        imagenUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZ9DMNFHxwZcfPXJrJeBMITxPMP3FMZk_ixXzTfzt4G_C-G058',
        contenido:'Podemos crear la identidad corporativa de tu empresa. Diseño , Maquetación de folletos, Catálogos, Papelería y mucho más.' },
      {
        titulo:'Derecho Tributario y Comercial',
        imagenUrl:'https://colmayorbolivar.edu.co/blog/wp-content/uploads/2017/06/imagen-administracion.jpg',
        contenido:'Nosotros creamos y optimizamos tus perfiles en las Redes Sociales. Importantes para que tu presencia online sea completa.' },
      {
        titulo:'Derecho Tributario',
        imagenUrl:'https://image.freepik.com/foto-gratis/desarrollo-programadores-desarrollo-tecnologias-diseno-codificacion-sitios-web_18497-1090.jpg',
        contenido:'Creamos tu página web utilizando las últimas tecnologías disponibles. Una Web adaptativa a tu móvil o Tablet y con un gestor de contenido' },
      {
        titulo:'Derecho Inmoviliario',
        imagenUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZ9DMNFHxwZcfPXJrJeBMITxPMP3FMZk_ixXzTfzt4G_C-G058',
        contenido:'Podemos crear la identidad corporativa de tu empresa. Diseño , Maquetación de folletos, Catálogos, Papelería y mucho más.' },
      {
        titulo:'Derecho Corporativo',
        imagenUrl:'https://colmayorbolivar.edu.co/blog/wp-content/uploads/2017/06/imagen-administracion.jpg',
        contenido:'Nosotros creamos y optimizamos tus perfiles en las Redes Sociales. Importantes para que tu presencia online sea completa.' },
      {
        titulo:'Derecho Regional',
        imagenUrl:'https://image.freepik.com/foto-gratis/desarrollo-programadores-desarrollo-tecnologias-diseno-codificacion-sitios-web_18497-1090.jpg',
        contenido:'Creamos tu página web utilizando las últimas tecnologías disponibles. Una Web adaptativa a tu móvil o Tablet y con un gestor de contenido' },
      {
        titulo:'Derecho Inmoviliario',
        imagenUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZ9DMNFHxwZcfPXJrJeBMITxPMP3FMZk_ixXzTfzt4G_C-G058',
        contenido:'Podemos crear la identidad corporativa de tu empresa. Diseño , Maquetación de folletos, Catálogos, Papelería y mucho más.' },
      {
        titulo:'Derecho Corporativo',
        imagenUrl:'https://colmayorbolivar.edu.co/blog/wp-content/uploads/2017/06/imagen-administracion.jpg',
        contenido:'Nosotros creamos y optimizamos tus perfiles en las Redes Sociales. Importantes para que tu presencia online sea completa.' },
      {
        titulo:'Derecho Regional',
        imagenUrl:'https://image.freepik.com/foto-gratis/desarrollo-programadores-desarrollo-tecnologias-diseno-codificacion-sitios-web_18497-1090.jpg',
        contenido:'Creamos tu página web utilizando las últimas tecnologías disponibles. Una Web adaptativa a tu móvil o Tablet y con un gestor de contenido' },
         {
        titulo:'Derecho Corporativo',
        imagenUrl:'https://colmayorbolivar.edu.co/blog/wp-content/uploads/2017/06/imagen-administracion.jpg',
        contenido:'Nosotros creamos y optimizamos tus perfiles en las Redes Sociales. Importantes para que tu presencia online sea completa.' },
      {
        titulo:'Derecho Regional',
        imagenUrl:'https://image.freepik.com/foto-gratis/desarrollo-programadores-desarrollo-tecnologias-diseno-codificacion-sitios-web_18497-1090.jpg',
        contenido:'Creamos tu página web utilizando las últimas tecnologías disponibles. Una Web adaptativa a tu móvil o Tablet y con un gestor de contenido' },
      {
        titulo:'Derecho Inmoviliario',
        imagenUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZ9DMNFHxwZcfPXJrJeBMITxPMP3FMZk_ixXzTfzt4G_C-G058',
        contenido:'Podemos crear la identidad corporativa de tu empresa. Diseño , Maquetación de folletos, Catálogos, Papelería y mucho más.' },
      {
        titulo:'Derecho Corporativo',
        imagenUrl:'https://colmayorbolivar.edu.co/blog/wp-content/uploads/2017/06/imagen-administracion.jpg',
        contenido:'Nosotros creamos y optimizamos tus perfiles en las Redes Sociales. Importantes para que tu presencia online sea completa.' },
      {
        titulo:'Derecho Regional',
        imagenUrl:'https://image.freepik.com/foto-gratis/desarrollo-programadores-desarrollo-tecnologias-diseno-codificacion-sitios-web_18497-1090.jpg',
        contenido:'Creamos tu página web utilizando las últimas tecnologías disponibles. Una Web adaptativa a tu móvil o Tablet y con un gestor de contenido' },
        {
          titulo:'Derecho Corporativo',
          imagenUrl:'https://colmayorbolivar.edu.co/blog/wp-content/uploads/2017/06/imagen-administracion.jpg',
          contenido:'Nosotros creamos y optimizamos tus perfiles en las Redes Sociales. Importantes para que tu presencia online sea completa.' },
        {
          titulo:'Derecho Regional',
          imagenUrl:'https://image.freepik.com/foto-gratis/desarrollo-programadores-desarrollo-tecnologias-diseno-codificacion-sitios-web_18497-1090.jpg',
          contenido:'Creamos tu página web utilizando las últimas tecnologías disponibles. Una Web adaptativa a tu móvil o Tablet y con un gestor de contenido' },
        {
          titulo:'Derecho Inmoviliario',
          imagenUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZ9DMNFHxwZcfPXJrJeBMITxPMP3FMZk_ixXzTfzt4G_C-G058',
          contenido:'Podemos crear la identidad corporativa de tu empresa. Diseño , Maquetación de folletos, Catálogos, Papelería y mucho más.' },
        {
          titulo:'Derecho Corporativo',
          imagenUrl:'https://colmayorbolivar.edu.co/blog/wp-content/uploads/2017/06/imagen-administracion.jpg',
          contenido:'Nosotros creamos y optimizamos tus perfiles en las Redes Sociales. Importantes para que tu presencia online sea completa.' },
        {
          titulo:'Derecho Regional',
          imagenUrl:'https://image.freepik.com/foto-gratis/desarrollo-programadores-desarrollo-tecnologias-diseno-codificacion-sitios-web_18497-1090.jpg',
          contenido:'Creamos tu página web utilizando las últimas tecnologías disponibles. Una Web adaptativa a tu móvil o Tablet y con un gestor de contenido' }
        ];
  }

  ngOnInit(): void {
  }



}
