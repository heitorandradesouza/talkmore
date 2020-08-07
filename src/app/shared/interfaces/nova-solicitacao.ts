export interface NovaSolicitacao {
  _id: string;
  empresa: string;
  cnpj: string;
  plano: string;
  tarifa: number;
  minutos: number;
  valorPlano: number;
  dataAdesao: Date;
  dataEnvio: Date;
}
