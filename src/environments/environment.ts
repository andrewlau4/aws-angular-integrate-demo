export const environment = {
  awsConfig: {
      Auth: {
          identityPoolId: 'x',

          region: 'x',
      
          identityPoolRegion: 'x',
      
          userPoolId: "x",
      
          userPoolWebClientId: "x",
      
          mandatorySignIn: false,
      },

      Storage: {
          AWSS3: {
            bucket: 'x',
            region: 'x', 
          }
        },

      predictions: {
        convert: {
          translateText: {
            region: 'x',
            proxy: false,
            defaults: {
              sourceLanguage: 'en',
              targetLanguage: 'zh'
            }
          },
          speechGenerator: {
            region: 'x',
            proxy: false,
            defaults: {
              VoiceId: 'Ivy',
              LanguageCode: 'en-US'
            }
          },
          transcription: {
            region: 'x',
            proxy: false,
            defaults: {
              language: 'en-US'
            }
          }
        },
        identify: {
          identifyText: {
            proxy: false,
            region: 'x',
            defaults: {
              format: 'PLAIN'
            }
          },
          identifyEntities: {
            proxy: false,
            region: 'x',
            celebrityDetectionEnabled: true,
            defaults: {
              collectionId: 'identifyEntities8b89c648-test',
              maxEntities: 50
            }
          },
          identifyLabels: {
            proxy: false,
            region: 'x',
            defaults: {
              type: 'LABELS'
            }
          }
        },
        interpret: {
          interpretText: {
            region: 'x',
            proxy: false,
            defaults: {
              type: 'ALL'
            }
          }
        }
      }
  }

};
