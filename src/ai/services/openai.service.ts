import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

import { EnvVars } from '../../env.model';

@Injectable()
export class OpenaiService {
  private openai: OpenAI;

  constructor(configService: ConfigService<EnvVars>) {
    const apyKey = configService.get("OPENAI_API_KEY", { infer: true });

    if(!apyKey) {
      throw new Error ("No se ha proporcionado la clave de API de OpenAI");
    }

    this.openai = new OpenAI({apiKey: apyKey});
  }
  async generateSummary(content: string){
    try {

      const  response = await this.openai.responses.create({
        model: "gpt-4o-mini",
        instructions: "Eres un asistente muy útil que genera resúmenes para las entradas del blog. usted deberia de generar un resumen que no supere los 155 caracteres o menos.",
        input: content
      })

      return response.output_text

    } catch (error) {
      throw new Error("Error al generar el resumen");
    }
  }

  async generateImage(text: string){
    try {

      const prompt = `Genera una imagen relacionada con el siguiente texto: ${text}`;
      const response = await this.openai.images.generate({
        model: "dall-e-3",
        prompt,
        response_format: "url"
      })

      return response.data?.[0]?.url;

    } catch (error) {
      throw new Error("Error al generar la imagen");
    }
  }
}
