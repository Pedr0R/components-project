import { Injectable } from '@angular/core';
import { ColumnDef } from '../components/dynamic-table/dynamic-table.model';

@Injectable({
  providedIn: 'root',
})
export class TestDataService {
  userColumns: ColumnDef[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Nome', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'city', label: 'Cidade', sortable: true },
    { key: 'company', label: 'Empresa', sortable: true }, // Coluna adicional não ordenável
  ];

  // Array de exemplo para inserir em [data]
  usersData = [
    {
      id: 1,
      name: 'Ana Beatriz',
      email: 'ana.beatriz@example.com',
      city: 'Rio de Janeiro',
      company: 'Tech Solutions',
    },
    {
      id: 2,
      name: 'Bruno Costa',
      email: 'bruno.c@example.com',
      city: 'São Paulo',
      company: 'Inova Corp',
    },
    {
      id: 3,
      name: 'Carlos Dias',
      email: 'carlos.dias@example.com',
      city: 'Salvador',
      company: 'Brasil Web',
    },
    {
      id: 4,
      name: 'Daniela Martins',
      email: 'daniela.m@example.com',
      city: 'Belo Horizonte',
      company: 'Minas Software',
    },
    {
      id: 5,
      name: 'Eduardo Ferreira',
      email: 'eduardo.f@example.com',
      city: 'São Paulo',
      company: 'Inova Corp',
    },
    {
      id: 6,
      name: 'Fernanda Lima',
      email: 'fernanda.lima@example.com',
      city: 'Curitiba',
      company: 'Sul Sistemas',
    },
    {
      id: 7,
      name: 'Gustavo Pereira',
      email: 'gustavo.p@example.com',
      city: 'Porto Alegre',
      company: 'Sul Sistemas',
    },
    {
      id: 8,
      name: 'Helena Santos',
      email: 'helena.s@example.com',
      city: 'Rio de Janeiro',
      company: 'Tech Solutions',
    },
    {
      id: 9,
      name: 'Igor Almeida',
      email: 'igor.a@example.com',
      city: 'Recife',
      company: 'Nordeste Digital',
    },
    {
      id: 10,
      name: 'Juliana Ribeiro',
      email: 'juliana.r@example.com',
      city: 'São Paulo',
      company: 'Brasil Web',
    },
  ];
}
