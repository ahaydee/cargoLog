import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as $ from 'jquery';
import { jsPDF } from 'jspdf';

@Component({
  selector: "app-relatorio-orcamentos",
  templateUrl: "./relatorio-orcamentos.component.html",
  styleUrls: ["./relatorio-orcamentos.component.css"]
})
export class RelatorioOrcamentosComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  onDownload(dateIn: string, dateFn: string) {
    if (dateIn == "" || dateFn == "") {
      if (dateIn == "") {
        $("#dateInError").show();
        $("#dateIn").addClass("error");
      }
      if (dateFn == "") {
        $("#dateFnError").show();
        $("#dateFn").addClass("error");
      }
      return;
    }
    var doc = new jsPDF();
    doc.text('Relatório', 10, 10);
    Swal.fire("Sucesso", "O relatório foi gerado com sucesso", "success");;
    doc.save('Relatório.pdf');
  }

  onEmail(dateIn: string, dateFn: string, content) {
    if (dateIn == "" || dateFn == "") {
      if (dateIn == "") {
        $("#dateInError").show();
        $("#dateIn").addClass("error");
      }
      if (dateFn == "") {
        $("#dateFnError").show();
        $("#dateFn").addClass("error");
      }
      return;
    }
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  }

  onChange(id: string, value) {
    if (value != "") {
      $("#"+id+"Error").hide();
      $("#"+id).removeClass("error");
    }
  }

  send(dest: string, assunto: string, mensagem: string) {
    if (dest == "" || dest == "0"|| assunto == "") {
      if (dest == ""|| dest == "0") {
        $("#destError").show();
        $("#dest").addClass("error");
      }
      if (assunto == "") {
        $("#assuntoError").show();
        $("#assunto").addClass("error");
      }
      return;
    }
    Swal.fire({
      title: "Atenção",
      html: "O email será enviado. Deseja continuar?",
      icon: "warning",
      showCancelButton: true
    }).then(v => {
      if (v.value) {
        this.modalService.dismissAll();
        Swal.fire("Sucesso", "O relatório foi enviado com sucesso", "success");
      }
    });
  }
}
