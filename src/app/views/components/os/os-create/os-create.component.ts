import { OsService } from './../../../../services/os.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Component, OnInit } from '@angular/core';
import { Tecnico } from 'src/app/models/tecnico';
import { Cliente } from 'src/app/models/cliente';
import { OS } from 'src/app/models/os';
import { Router } from '@angular/router';

@Component({
  selector: 'app-os-create',
  templateUrl: './os-create.component.html',
  styleUrls: ['./os-create.component.css']
})
export class OsCreateComponent implements OnInit {

  os: OS = {
    tecnico: '',
    cliente: '',
    observacoes: '',
    status: '',
    prioridade: ''
  }

  tecnicos: Tecnico[] = []
  clientes: Cliente[] = []

  constructor(
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private service: OsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listarTecnicos()
    this.listarClientes()    
  }

  create(): void {
    this.service.create(this.os).subscribe(resposta => {
      this.service.message("Ordem de Serviço criada com sucesso!");
      this.router.navigate(['os'])
    })
  }

  cancel(): void {
    this.router.navigate(['os'])
  }

  listarTecnicos(): void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }

  listarClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }



}
