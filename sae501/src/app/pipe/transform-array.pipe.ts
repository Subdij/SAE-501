import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformArray'
})
export class TransformArrayPipe implements PipeTransform {

  transform(value: any): any[] {
    const result = [];
    for (const key in value) {
      if (value.hasOwnProperty(key) && key !== 'total' && key !== 'most_used_transport' && key !=='percentage_most_used_transport') {
        switch(key) {
          case 'bouche_a_oreille':
            result.push({ value: value[key], name :'Bouche à oreille'});
            break;
          case 'affiches':
            result.push({ value: value[key], name :'Affiches'});
            break;
          case 'reseaux_sociaux':
            result.push({ value: value[key], name :'Réseaux sociaux'});
            break;
          case 'recherches_personnelles':
            result.push({ value: value[key], name :'Recherches'});
            break;
          case 'autre':
            result.push({ value: value[key], name :'Autre'});
            break;
          case 'developpement_web':
            result.push({ value: value[key], name :'Dév. Web'});
            break;
          case 'creation_jeux_video':
            result.push({ value: value[key], name :'Jeux-vidéo'});
            break;
          case 'design':
            result.push({ value: value[key], name :'Design'});
            break;
          case 'graphisme':
            result.push({ value: value[key], name :'Graphisme'});
            break;
          case 'audiovisuel':
            result.push({ value: value[key], name :'Audiovisuel'});
            break;
          case 'general':
            result.push({ value: value[key], name :'Bac Général'});
            break;
          case 'technologique':
            result.push({ value: value[key], name :'Bac Techno'});
            break;
          case 'professionnel':
            result.push({ value: value[key], name :'Bac Pro'});
            break;
          case 'pied':
            result.push({ value: value[key], name :'A pied'});
            break;
          case 'velo_trotinette':
            result.push({ value: value[key], name :'Vélo / Trotinette'});
            break;
          case 'train':
            result.push({ value: value[key], name :'En train'});
            break;
          case 'voiture':
            result.push({ value: value[key], name :'En voiture'});
            break;
          case 'bus':
            result.push({ value: value[key], name :'En bus'});
            break;
          case '<30':
            result.push({ value: value[key], name :'< 30 min'});
            break;
          case '30-45':
            result.push({ value: value[key], name :'30 - 45 min'});
            break;
          case '45-90':
            result.push({ value: value[key], name :'45 min - 1h30'});
            break;
          case '>90':
            result.push({ value: value[key], name :'> 1h30'});
            break;
          default:
            result.push({ value: value[key], name: key });
        }
      }
    }
    return result;
  }
}