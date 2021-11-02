import BlingEntity from '../core/entity'
import { AxiosInstance as IAxiosInstance } from 'axios'

export interface IOrder {
  data?: Date
  data_saida?: Date
  data_prevista?: Date
  numero?: string
  numero_loja?: string
  loja?: number
  nat_operacao?: string
  vendedor?: string
  cliente: {
    id?: number
    nome: string
    tipoPessoa?: 'F' | 'J'
    cpf_cnpj?: string
    ie?: string
    rg?: string
    contribuinte?: '1' | '2' | '9'
    endereco?: string
    numero?: string
    complemento?: string
    bairro?: string
    cep?: string
    cidade?: string
    uf?: string
    fone?: string
    celular?: string
    email?: string
  }
  transporte?: {
    transportadora?: string
    tipo_frete?: string
    servico_correios?: string
    codigo_cotacao?: string
    peso_bruto?: number
    qtde_volumes?: number
    dados_etiqueta?: {
      nome?: string
      endereco?: string
      numero?: string
      complemento?: string
      municipio?: string
      uf?: string
      cep?: string
      bairro?: string
    }
    volumes?: {
      volume: {
        servico: string
        codigoRastreamento?: string
        itens?: {
          item?: {
            codigo?: string
            descricao: string
            un?: 'pc' | 'un' | 'cx'
            qtde: number
            vlr_unit: number
            vlr_desconto?: number
          }
        }[]
      }
    }[]
  }
  idFormaPagamento?: number
  parcelas?: {
    parcela?: {
      dias?: number
      data?: Date
      vlr: number
      obs?: string
      forma_pagamento?: {
        id?: number
      }
    }
  }[]
  vlr_frete?: number
  vlr_desconto?: string
  obs?: string
  obs_internas?: string
  numeroOrdemCompra?: string
  outrasDespesas?: number
  intermediador?: {
    nomeUsuario?: string
    cnpjInstituicaoPagamento?: string
  }
}

export interface IOrderInfos {
  historico?: 'true' | 'false'
}

export interface IOrderFilters {
  dataEmissao?: string
  dataAlteracao?: string
  dataPrevista?: string
  idSituacao?: string
  idContato?: string
}

export type IOrderResponse = IOrder

export default class Orders extends BlingEntity<
  IOrder,
  IOrderFilters,
  IOrderInfos,
  IOrderResponse
> {
  constructor (api: IAxiosInstance, apiKey: string) {
    super(api, apiKey)

    this.singularName = 'pedido'
    this.pluralName = 'pedidos'
  }
}

module.exports = Orders
