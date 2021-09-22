import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {
  id_cli = "";

  cliente: Cliente = {
    id: "",
    nome: "",
    cpf: "",
    telefone: "",
  };

  nome = new FormControl("", [Validators.minLength(3)]);
  cpf = new FormControl("", [Validators.minLength(11)]);
  telefone = new FormControl("", [Validators.minLength(11)]);

  constructor(
    private router: Router,
    private service: ClienteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id_cli = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  update(): void {
    this.service.update(this.cliente).subscribe(
      (resposta) => {
        this.router.navigate(["clientes"]);
        this.service.message("Cliente atualizado com sucesso!");
      },
      err => {
        if (err.error.error.match("já cadastrado")) {
          this.service.message(err.error.error);
        } else if (
          err.error.errors[0].message ===
          "número do registro de contribuinte individual brasileiro (CPF) inválido"
        ) {
          this.service.message("CPF inválido!")
        }
      })
    
  }

  findById(): void {
    this.service.findById(this.id_cli).subscribe((resposta) => {
      this.cliente = resposta;
    });
  }

  cancel(): void {
    this.router.navigate(["clientes"]);
  }

  errorValidName() {
    if (this.nome.invalid) {
      return "O nome deve ter entre 3 e 80 caracteres";
    }
    return false;
  }
  errorValidCpf() {
    if (this.nome.invalid) {
      return "O CPF deve ter entre 11 e 15 caracteres";
    }
    return false;
  }
  errorValidTelefone() {
    if (this.nome.invalid) {
      return "O nome deve ter entre 11 e 18 caracteres";
    }
    return false;
  }
}
