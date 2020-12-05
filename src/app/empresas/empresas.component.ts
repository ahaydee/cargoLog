import { Component, Input, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AngularFireDatabase } from 'angularfire2/database';
import { Empresa } from '../entity';


@Component({
  selector: "app-empresas",
  templateUrl: "./empresas.component.html",
  styleUrls: ["./empresas.component.css"]
})
export class EmpresasComponent implements OnInit {

  @Input() public current: Empresa;
  public empresas:Array<Empresa>;
  constructor(private modalService: NgbModal,public db: AngularFireDatabase) {
    db.list<Empresa>('empresas').valueChanges().subscribe(items => { 
      this.empresas = items;
    });
  }
  ngOnInit() {}

  add(content) {
    this.modalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
      size: "lg"
    });
  }

  onChange(id: string, value) {
    if (value != "") {
      $("#"+id+"Error").hide();
      $("#"+id).removeClass("error");
    }
  }

  edit(template, cnpj: string) {
    this.db.list<Empresa>('empresas').valueChanges().subscribe(items => { 
      this.current = items.filter(e => (e.CNPJ == cnpj))[0];
      const modalRef = this.modalService.open(template, {
        ariaLabelledBy: "modal-basic-title",
        size: "lg"
      });
    });
  }

  close() {
    this.modalService.dismissAll();
  }

  saveAdd(CNPJ: string,Nome: string,Telefone: string,Email: string,RazaoSocial: string,DsCNPJ: string,
    Endereco: string,CEP: string,UF: string,Municipio: string,Bairro: string,Pais: string,IE: string) {

    if (CNPJ == "" || Nome == "" || Telefone == "" || RazaoSocial == "" || Endereco == "" || CEP == "" || UF == "" || Municipio == "" 
    || Bairro == "" || Pais == ""|| IE == "") {
      if (CNPJ == "") {
        $("#cnpjError").show();
        $("#cnpj").addClass("error");
      }
      if (Nome == "") {
        $("#nomeError").show();
        $("#nome").addClass("error");
      }
      if (Telefone == "") {
        $("#telError").show();
        $("#tel").addClass("error");
      }
      if (RazaoSocial == "") {
        $("#razaoError").show();
        $("#razao").addClass("error");
      }
      if (Endereco == "") {
        $("#endError").show();
        $("#end").addClass("error");
      }
      if (CEP == "") {
        $("#cepError").show();
        $("#cep").addClass("error");
      }
      if (UF == "") {
        $("#ufError").show();
        $("#uf").addClass("error");
      }
      if (Municipio == "") {
        $("#municipioError").show();
        $("#municipio").addClass("error");
      }
      if (Bairro == "") {
        $("#bairroError").show();
        $("#bairro").addClass("error");
      }
      if (Pais == "") {
        $("#paisError").show();
        $("#pais").addClass("error");
      }
      if (IE == "") {
        $("#ieError").show();
        $("#ie").addClass("error");
      }

      return;
    }

    Swal.fire({
      title: "Atenção",
      html: "A empresa será salva. Deseja continuar?",
      icon: "warning",
      showCancelButton: true
    }).then(v => {
      if (v.value) {
        let empresa: Empresa = {
          CNPJ,Nome, Telefone, Email, RazaoSocial, DsCNPJ, Endereco, CEP, UF, Municipio, Bairro, Pais, IE
        }
        this.db.list<Empresa>("empresas").set(empresa.CNPJ, empresa).then((result: any) => {
          Swal.fire("Sucesso", "A empresa foi salva com sucesso", "success");
          this.modalService.dismissAll();
        }).catch(result => {
          Swal.fire("Erro", "Ocorreu um erro ao salvar a empresa", "error");
          this.modalService.dismissAll();
        });
      }
    });
  }

  save(CNPJ: string,Nome: string,Telefone: string,Email: string,RazaoSocial: string,DsCNPJ: string,
    Endereco: string,CEP: string,UF: string,Municipio: string,Bairro: string,Pais: string,IE: string) {

    if (CNPJ == "" || Nome == "" || Telefone == "" || RazaoSocial == "" || Endereco == "" || CEP == "" || UF == "" || Municipio == "" 
    || Bairro == "" || Pais == ""|| IE == "") {
      if (CNPJ == "") {
        $("#cnpj2Error").show();
        $("#cnpj2").addClass("error");
      }
      if (Nome == "") {
        $("#nome2Error").show();
        $("#nome2").addClass("error");
      }
      if (Telefone == "") {
        $("#tel2Error").show();
        $("#tel2").addClass("error");
      }
      if (RazaoSocial == "") {
        $("#razao2Error").show();
        $("#razao2").addClass("error");
      }
      if (Endereco == "") {
        $("#end2Error").show();
        $("#end2").addClass("error");
      }
      if (CEP == "") {
        $("#cep2Error").show();
        $("#cep2").addClass("error");
      }
      if (UF == "") {
        $("#uf2Error").show();
        $("#uf2").addClass("error");
      }
      if (Municipio == "") {
        $("#municipio2Error").show();
        $("#municipio2").addClass("error");
      }
      if (Bairro == "") {
        $("#bairro2Error").show();
        $("#bairro2").addClass("error");
      }
      if (Pais == "") {
        $("#pais2Error").show();
        $("#pais2").addClass("error");
      }
      if (IE == "") {
        $("#ie2Error").show();
        $("#ie2").addClass("error");
      }

      return;
    }
    Swal.fire({
      title: "Atenção",
      html: "A empresa será salva. Deseja continuar?",
      icon: "warning",
      showCancelButton: true
    }).then(v => {
      if (v.value) {
        let empresa: Empresa = {
          CNPJ,Nome, Telefone, Email, RazaoSocial, DsCNPJ, Endereco, CEP, UF, Municipio, Bairro, Pais, IE
        }
        this.db.list<Empresa>("empresas").update(empresa.CNPJ, empresa).then((result: any) => {
          Swal.fire("Sucesso", "A empresa foi salva com sucesso", "success");
          this.modalService.dismissAll();
        }).catch(result => {
          Swal.fire("Erro", "Ocorreu um erro ao salvar a empresa", "error");
          this.modalService.dismissAll();
        });
      }
    });
  }

}
