export enum ETipoCarroceria {
    Container = 1,
    Granel = 2,
    CargaSeca = 3
}

export enum ETipoTomador {
    Destinatario = 2,
    Remetente = 1,
    Nenhum = 0,
    Ambos = 3
}

export enum ETipoTransporte {
    Importacao = 1,
    Exportacao = 2,
    NDA = 3
}

export enum ESituacao {
    Pendente = 1,
    Arquivado = 2,
    EmAndamento = 3,
    Finalizado = 4,
    Confirmado = 5
}

export interface Empresa {
    CNPJ: string;
    Nome: string;
    Telefone: string;
    Email?: string;
    RazaoSocial: string;
    DsCNPJ: string;
    Endereco: string;
    CEP: string;
    UF: string;
    Municipio: string;
    Bairro: string;
    Pais: string;
    IE: string;
  }

export interface Produto {
    Id: number;
    Orcamento: number;
    VlTotal: number;
    Volume: number;
    Altura: number;
    Largura: number;
    Comprimento: number;
    PesoUnitario: number;
    Acondicionamento: string;
    QtdeAcondicionamento: number;
    Desc: string;
    Container: string;
    TipoCarroceria: ETipoCarroceria;
  }
  
  export interface Orcamento {
    Id: number;
    DataPedido: string;
    DataEntrega: string;
    DataColeta: string;
    QtTotalKm: number;
    VlFreteCaminhoneiro: number;
    VlTotalFrete: number;
    VlPedagio: number;
    VlDespachante?: number;
    VlTotalServico: number;
    TipoTransporte: number;
    SituacaoAtual: number;
    Tomador: string;
    Coleta: string;
    Entrega: string;
    TipoTomador: number;
  }
  