import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase } from 'angularfire2/database';
import { ETipoCarroceria, ETipoTomador, ESituacao, ETipoTransporte, Orcamento, Empresa,Produto } from '../entity';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.css']
})
export class OrcamentoComponent implements OnInit {
  orcamentos: Array<Orcamento> = [];
  enumSituacao = ESituacao;
  enumTipo = ETipoTransporte;
  orcamento: Orcamento;
  modalRef: NgbModalRef;
  allProdutos:Array<Produto> = [];
  
  @Input() public edit: Orcamento;
  public empresas:Array<Empresa>;
  public produtos:Array<Produto>;
  public products:Array<Produto>;
  constructor(private modalService: NgbModal,public db: AngularFireDatabase, private route: ActivatedRoute) {
    moment.locale("pt-br");
    db.list<Orcamento>('orcamentos').valueChanges().subscribe(items => { 
      this.orcamentos = items.map(o=> {
        let or = {...o, DataColeta: o.DataColeta ? o.DataColeta : "-", 
        DataEntrega: o.DataEntrega ? o.DataEntrega : "-", 
        DataPedido: o.DataPedido ? o.DataPedido : "-"}
        return or;
      });
      
      this.route.paramMap.subscribe(params => {
        let id = params.get('id');
        if (!isNaN(parseInt(id))) {
          let index = items.findIndex(o => o.Id == parseInt(id));
          this.orcamento = items[index];
        }
      });
    });
    db.list<Produto>('produtos').valueChanges().subscribe(items => { 
      this.allProdutos = items;
    });
    
    db.list<Empresa>('empresas').valueChanges().subscribe(items => { 
      this.empresas = items;
    });
    db.list<Produto>('produtos').valueChanges().subscribe(items => { 
      this.route.paramMap.subscribe(params => {
        let id = params.get('id');
        if (!isNaN(parseInt(id))) {
          this.produtos = items.filter(p=> p.Orcamento == parseInt(id));
          this.products = items.filter(p=> p.Orcamento == parseInt(id));
        }
      });
    });
  }

  ngOnInit(): void {
  }

  confirmar() {
    Swal.fire({
      title: "Atenção",
      html: "O orçamento será confirmado. Deseja continuar?",
      icon: "warning",
      showCancelButton: true
    }).then(v => {
      if (v.value) {
        let orcamento: Orcamento = {
          ...this.orcamento, SituacaoAtual: ESituacao.Confirmado
        }
        this.db.list<Orcamento>("orcamentos").update(orcamento.Id.toString(), orcamento).then((result: any) => {
          Swal.fire("Sucesso", "O orçamento foi confirmado com sucesso", "success");
        }).catch(result => {
          Swal.fire("Erro", "Ocorreu um erro ao confirmar o orçamento", "error");
        });
      }
    });
  }

  arquivar() {
    Swal.fire({
      title: "Atenção",
      html: "O orçamento será arquivado. Deseja continuar?",
      icon: "warning",
      showCancelButton: true
    }).then(v => {
      if (v.value) {
        let orcamento: Orcamento = {
          ...this.orcamento, SituacaoAtual: ESituacao.Arquivado
        }
        this.db.list<Orcamento>("orcamentos").update(orcamento.Id.toString(), orcamento).then((result: any) => {
          Swal.fire("Sucesso", "O orçamento foi arquivado com sucesso", "success");
        }).catch(result => {
          Swal.fire("Erro", "Ocorreu um erro ao arquivar o orçamento", "error");
        });
      }
    });
  }

  editar(content) {
    this.db.list<Orcamento>('orcamentos').valueChanges().subscribe(items => { 
      let ed = items.filter(o => o.Id == this.orcamento.Id)[0];
      this.edit = {... ed,
        Tomador:this.empresas.filter(e => e.Nome == ed.Tomador)[0].CNPJ,
        Coleta:this.empresas.filter(e => e.Nome == ed.Coleta)[0].CNPJ,
        Entrega:this.empresas.filter(e => e.Nome == ed.Entrega)[0].CNPJ,
        DataColeta: moment(ed.DataColeta,"DD/MM/YYYY").format("YYYY-MM-DD"),
        DataEntrega: moment(ed.DataEntrega,"DD/MM/YYYY").format("YYYY-MM-DD"),
       };
      this.modalService.open(content, {
        ariaLabelledBy: "modal-basic-title",
        size: "lg"
      });
    });
  }

  
  addProduto(template) {
    this.modalRef = this.modalService.open(template, {
      ariaLabelledBy: "modal-basic-title-template",
      size: "lg"
    });
  }

  
  onChange(id: string, value) {
    if (value != "") {
      $("#"+id+"Error").hide();
      $("#"+id).removeClass("error");
    }
  }

  close() {
    this.modalService.dismissAll();
  }

  save(Tomador: string,Coleta: string,Entrega: string,TipoTomador: string,DataColeta: string,DataEntrega: string,TipoTransporte: string,
    VlDespachante: string, VlPedagio: string,VlFreteCaminhoneiro: string, VlTotalServico: string,VlTotalFrete: string) {
    if (Tomador == "" || Coleta == "" || Entrega == "" || Tomador == "0" || Coleta == "0" || Entrega == "0" || TipoTomador == "-1" || 
    DataColeta == "" || DataEntrega == "" || TipoTransporte == "" || TipoTransporte == "0" || VlFreteCaminhoneiro == "" || 
    VlTotalServico == "" || VlTotalFrete == "" || VlFreteCaminhoneiro == "0" || VlTotalServico == "0" || VlTotalFrete == "0" || this.produtos.length == 0
    ) {
      if (Tomador == ""|| Tomador == "0") {
        $("#tomadorError").show();
        $("#tomador").addClass("error");
      }
      if (Coleta == ""|| Coleta == "0") {
        $("#coletaError").show();
        $("#coleta").addClass("error");
      }
      if (Entrega == ""|| Entrega == "0") {
        $("#entregaError").show();
        $("#entrega").addClass("error");
      }
      if (TipoTomador == ""|| TipoTomador == "-1") {
        $("#tipoTomadorError").show();
        $("#tipoTomador").addClass("error");
      }
      if (DataColeta == "") {
        $("#dtColetaError").show();
        $("#dtColeta").addClass("error");
      }
      if (DataEntrega == "") {
        $("#dtEntregaError").show();
        $("#dtEntrega").addClass("error");
      }
      if (TipoTransporte == ""|| TipoTransporte == "0") {
        $("#tipoTransporteError").show();
        $("#tipoTransporte").addClass("error");
      }
      if (VlFreteCaminhoneiro == ""|| VlFreteCaminhoneiro == "0") {
        $("#vlCaminhoneiroError").show();
        $("#vlCaminhoneiro").addClass("error");
      }
      if (VlTotalServico == ""|| VlTotalServico == "0") {
        $("#totalServicoError").show();
        $("#totalServico").addClass("error");
      }
      if (VlTotalFrete == ""|| VlTotalFrete == "0") {
        $("#totalFreteError").show();
        $("#totalFrete").addClass("error");
      }
      if (this.products.length == 0) {
        $("#produtosError").show();
      }
      return;
    }

    Swal.fire({
      title: "Atenção",
      html: "O orçamento será salvo. Deseja continuar?",
      icon: "warning",
      showCancelButton: true
    }).then(v => {
      if (v.value) {
        let orcamento: Orcamento = {
          Id: this.edit.Id,
          DataPedido: this.edit.DataPedido,
          Tomador:this.empresas.filter(e => e.CNPJ == Tomador)[0].Nome,
          Coleta:this.empresas.filter(e => e.CNPJ == Coleta)[0].Nome,
          Entrega:this.empresas.filter(e => e.CNPJ == Entrega)[0].Nome,
          TipoTomador: parseInt(TipoTomador),
          DataColeta: moment(DataColeta).format("DD/MM/YYYY"),
          DataEntrega: moment(DataEntrega).format("DD/MM/YYYY"),
          TipoTransporte: parseInt(TipoTransporte),
          VlDespachante: VlDespachante? parseFloat(VlDespachante) : null, 
          VlPedagio: VlPedagio? parseFloat(VlPedagio) : null,
          VlFreteCaminhoneiro: parseFloat(VlFreteCaminhoneiro), 
          VlTotalServico: parseFloat(VlTotalServico),
          VlTotalFrete: parseFloat(VlTotalFrete),
          QtTotalKm: 0,
          SituacaoAtual: this.edit.SituacaoAtual
        }
        this.db.list<Orcamento>("orcamentos").update(orcamento.Id.toString(), orcamento).then((result: any) => {
          this.allProdutos.filter(p => p.Orcamento == orcamento.Id).forEach(p=> {
            let d = this.products.filter(r => r.Orcamento == p.Orcamento && p.Id == r.Id)
            if (d.length == 0) 
              this.db.list<Produto>("produtos").remove(orcamento.Id.toString()+"-"+p.Id.toString())
          })
          this.products.forEach(p=> {
            let d = this.allProdutos.filter(r => r.Orcamento == orcamento.Id && p.Id == r.Id)
            if (d.length > 0) 
              this.db.list<Produto>("produtos").update(orcamento.Id.toString()+"-"+p.Id.toString(), p);
            else
              this.db.list<Produto>("produtos").set(orcamento.Id.toString()+"-"+p.Id.toString(), p);
          })
          Swal.fire("Sucesso", "O orçamento foi salvo com sucesso", "success");
          this.modalService.dismissAll();
        }).catch(result => {
          Swal.fire("Erro", "Ocorreu um erro ao salvar o orçamento", "error");
          this.modalService.dismissAll();
        });
      }
    });
  }

  salvarProduto(VlTotal: string,Volume: string,Altura: string,Largura: string,Comprimento: string,PesoUnitario: string,
    Acondicionamento: string,QtdeAcondicionamento: string,Desc: string,Container: string,TipoCarroceria: string) {
    let id = this.produtos.length > 0 ? Math.max(...this.produtos.map(o => o.Id))+1 : 1;
    if (VlTotal == "" || VlTotal == "0" || Volume == "" || Volume == "0"|| Altura == ""|| Altura == "0" || Largura == "" || Largura == "0"
    || Comprimento == "" || Comprimento == "0"|| PesoUnitario == ""|| PesoUnitario == "0" || Acondicionamento == "" || 
    QtdeAcondicionamento == "" || Desc == "" || (TipoCarroceria == "1" && Container == "") || TipoCarroceria == "" || TipoCarroceria == "0" 
    ) {
      if (VlTotal == "" || VlTotal == "0") {
        $("#totalCargaError").show();
        $("#totalCarga").addClass("error");
      }
      if (Volume == "" || Volume == "0") {
        $("#numVolumesError").show();
        $("#numVolumes").addClass("error");
      }
      if (Altura == ""|| Altura == "0") {
        $("#alturaError").show();
        $("#altura").addClass("error");
      }
      if (Largura == ""|| Largura == "0") {
        $("#larguraError").show();
        $("#largura").addClass("error");
      }
      if (Comprimento == "" || Comprimento == "0") {
        $("#comprimentoError").show();
        $("#comprimento").addClass("error");
      }
      if (PesoUnitario == ""|| PesoUnitario == "0") {
        $("#pesoVolumeError").show();
        $("#pesoVolume").addClass("error");
      }
      if (Acondicionamento == "") {
        $("#acondicionamentoError").show();
        $("#acondicionamento").addClass("error");
      }
      if (QtdeAcondicionamento == "") {
        $("#qtdeAcondicionadaError").show();
        $("#qtdeAcondicionada").addClass("error");
      }
      if (Desc == "") {
        $("#descError").show();
        $("#desc").addClass("error");
      }
      if (TipoCarroceria == "1" && Container == "") {
        $("#numContainerError").show();
        $("#numContainer").addClass("error");
      }
      if (TipoCarroceria == "" || TipoCarroceria == "0") {
        $("#tipoCarroceriaError").show();
        $("#tipoCarroceria").addClass("error");
      }
      return;
    }

    Swal.fire({
      title: "Atenção",
      html: "O produto será salvo. Deseja continuar?",
      icon: "warning",
      showCancelButton: true
    }).then(v => {
      if (v.value) {
        let produto: Produto ={
          Id:id,
          Orcamento: this.edit.Id,
          VlTotal: parseFloat(VlTotal),
          Volume: parseFloat(Volume),
          Altura: parseFloat(Altura),
          Largura: parseFloat(Largura),
          Comprimento: parseFloat(Comprimento),
          PesoUnitario: parseFloat(PesoUnitario),
          Acondicionamento,
          QtdeAcondicionamento: parseFloat(QtdeAcondicionamento),
          Desc,
          Container,
          TipoCarroceria: parseInt(TipoCarroceria),
        };
        this.products = this.products.concat(produto);
        Swal.fire("Sucesso", "O produto foi salvo com sucesso", "success");
        this.modalRef.close();
      }
    });
  }

  removerCarga(id: number) {
    Swal.fire({
      title: "Atenção",
      html: "O produto será removido. Deseja continuar?",
      icon: "warning",
      showCancelButton: true
    }).then(v => {
      if (v.value) {
        this.products = this.products.filter(p => p.Id != id);
        Swal.fire("Sucesso", "O produto foi removido com sucesso", "success");
      }
    });
  }
}
