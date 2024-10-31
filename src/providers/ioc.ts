import { rateLimitOptions } from 'axios-rate-limit'
import { BlingRepository } from '../repositories/bling.repository'
import { IBlingRepository } from '../repositories/bling.repository.interface'

/**
 * Obtém a instância do repositório para injeção de dependência.
 *
 * @returns {IBlingRepository}
 */
export function getRepository(accessToken: string, rateLimitOptions?: rateLimitOptions): IBlingRepository {
  return new BlingRepository({
    baseUrl: 'https://www.bling.com.br/Api/v3',
    accessToken,
    rateLimitOptions,
  })
}
