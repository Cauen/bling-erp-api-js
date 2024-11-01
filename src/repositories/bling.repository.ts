import axios, { AxiosError, AxiosInstance } from 'axios'
import { IDefaultErrorResponse } from '../entities/@shared/interfaces/error.interface'
import { BlingApiException } from '../exceptions/bling-api.exception'
import { BlingInternalException } from '../exceptions/bling-internal.exception'
import {
  IBlingRepository,
  IDefaultHeaders,
  IDefaultParams,
  IDestroyOptions,
  IIndexOptions,
  IReplaceOptions,
  IShowOptions,
  IStoreOptions,
  IUpdateOptions
} from './bling.repository.interface'
import rateLimit, { rateLimitOptions } from 'axios-rate-limit';

interface IBlingRepositoryProps {
  /**
   * A URL base para chamada da API.
   */
  baseUrl: string

  /**
   * O _token_ de autenticação.
   */
  accessToken: string

  /**
   * Opções de rate limit.
   */
  rateLimitOptions?: rateLimitOptions
}

/**
 * Repositório para acesso à API do Bling.
 */
export class BlingRepository implements IBlingRepository {
  /** @property Propriedades da classe. */
  private props: IBlingRepositoryProps

  /** @property A instância `axios` para chamadas API. */
  private api: AxiosInstance

  /**
   * Constrói o objeto.
   *
   * @param props As propriedades da classe.
   */
  constructor(props: IBlingRepositoryProps) {
    this.props = props

    const axiosInstance = axios.create({ baseURL: this.props.baseUrl })
    this.api = this.props.rateLimitOptions ?
      rateLimit(axiosInstance, this.props.rateLimitOptions) :
      axiosInstance

    this.api.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${this.props.accessToken}`
      return config
    })
  }

  /**
   * @inheritDoc
   *
   * @throws {BlingApiException|BlingInternalException}
   */
  public async index<
    IIndexBody,
    IIndexResponse,
    IParams extends IDefaultParams = IDefaultParams,
    IHeaders extends IDefaultHeaders = IDefaultHeaders
  >(
    options: IIndexOptions<IIndexBody, IParams, IHeaders>
  ): Promise<IIndexResponse> {
    return await this.api
      .get<IIndexResponse>(`${options.endpoint}`, {
        params: options.params,
        headers: options.headers,
        data: options.body
      })
      .then((response) =>
        options.shouldIncludeHeadersInResponse
          ? {
            headers: response.headers,
            ...response.data
          }
          : response.data
      )
      .catch((error: AxiosError<IDefaultErrorResponse>) =>
        this.defaultCatchBehavior(error, options.endpoint)
      )
  }

  /**
   * @inheritDoc
   *
   * @throws {BlingApiException|BlingInternalException}
   */
  public async show<
    IShowResponse,
    IParams extends IDefaultParams = IDefaultParams,
    IHeaders extends IDefaultHeaders = IDefaultHeaders
  >(options: IShowOptions<IParams, IHeaders>): Promise<IShowResponse> {
    const endpoint = `${options.endpoint}/${options.id}`
    return await this.api
      .get<IShowResponse>(endpoint, {
        params: options.params,
        headers: options.headers
      })
      .then((response) =>
        options.shouldIncludeHeadersInResponse
          ? {
            headers: response.headers,
            ...response.data
          }
          : response.data
      )
      .catch((error: AxiosError<IDefaultErrorResponse>) =>
        this.defaultCatchBehavior(error, endpoint)
      )
  }

  /**
   * @inheritDoc
   *
   * @throws {BlingApiException|BlingInternalException}
   */
  public async store<
    IStoreBody,
    IStoreResponse,
    IParams extends IDefaultParams = IDefaultParams,
    IHeaders extends IDefaultHeaders = IDefaultHeaders
  >(
    options: IStoreOptions<IStoreBody, IParams, IHeaders>
  ): Promise<IStoreResponse> {
    return await this.api
      .post<IStoreResponse>(`${options.endpoint}`, options.body, {
        params: options.params,
        headers: options.headers
      })
      .then((response) =>
        options.shouldIncludeHeadersInResponse
          ? {
            headers: response.headers,
            ...response.data
          }
          : response.data
      )
      .catch((error: AxiosError<IDefaultErrorResponse>) =>
        this.defaultCatchBehavior(error, options.endpoint)
      )
  }

  /**
   * @inheritDoc
   *
   * @throws {BlingApiException|BlingInternalException}
   */
  public async update<
    IUpdateBody,
    IUpdateResponse,
    IParams extends IDefaultParams = IDefaultParams,
    IHeaders extends IDefaultHeaders = IDefaultHeaders
  >(
    options: IUpdateOptions<IUpdateBody, IParams, IHeaders>
  ): Promise<IUpdateResponse> {
    const endpoint = `${options.endpoint}/${options.id}`
    return await this.api
      .patch<IUpdateResponse>(endpoint, options.body, {
        params: options.params,
        headers: options.headers
      })
      .then((response) =>
        options.shouldIncludeHeadersInResponse
          ? {
            headers: response.headers,
            ...response.data
          }
          : response.data
      )
      .catch((error: AxiosError<IDefaultErrorResponse>) =>
        this.defaultCatchBehavior(error, endpoint)
      )
  }

  /**
   * @inheritDoc
   *
   * @throws {BlingApiException|BlingInternalException}
   */
  public async replace<
    IReplaceBody,
    IReplaceResponse,
    IParams extends IDefaultParams = IDefaultParams,
    IHeaders extends IDefaultHeaders = IDefaultHeaders
  >(
    options: IReplaceOptions<IReplaceBody, IParams, IHeaders>
  ): Promise<IReplaceResponse> {
    const endpoint = `${options.endpoint}/${options.id}`
    return await this.api
      .patch<IReplaceResponse>(endpoint, options.body, {
        params: options.params,
        headers: options.headers
      })
      .then((response) =>
        options.shouldIncludeHeadersInResponse
          ? {
            headers: response.headers,
            ...response.data
          }
          : response.data
      )
      .catch((error: AxiosError<IDefaultErrorResponse>) =>
        this.defaultCatchBehavior(error, endpoint)
      )
  }

  /**
   * @inheritDoc
   *
   * @throws {BlingApiException|BlingInternalException}
   */
  public async destroy<
    IDestroyResponse,
    IParams extends IDefaultParams = IDefaultParams,
    IHeaders extends IDefaultHeaders = IDefaultHeaders
  >(options: IDestroyOptions<IParams, IHeaders>): Promise<IDestroyResponse> {
    const endpoint = `${options.endpoint}/${options.id}`
    return await this.api
      .delete<IDestroyResponse>(endpoint, {
        params: options.params,
        headers: options.headers
      })
      .then((response) =>
        options.shouldIncludeHeadersInResponse
          ? {
            headers: response.headers,
            ...response.data
          }
          : response.data
      )
      .catch((error: AxiosError<IDefaultErrorResponse>) =>
        this.defaultCatchBehavior(error, endpoint)
      )
  }

  /**
   * Trata os erros da API de forma padrão.
   *
   * @param rawError Erro do axios.
   * @param endpoint _Endpoint_ de chamada.
   *
   * @returns {never}
   * @throws {BlingApiException|BlingInternalException}
   */
  private defaultCatchBehavior(
    rawError: AxiosError<IDefaultErrorResponse>,
    endpoint: string
  ): never {
    const data = rawError.response?.data

    if (!data) {
      throw new BlingInternalException(
        `Não foi possível realizar a chamada HTTP: ${rawError.config?.method} ${endpoint}`
      )
    }

    throw new BlingApiException(data)
  }
}
