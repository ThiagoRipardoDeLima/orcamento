    
    export enum Estados {
        AC = 'Acre',
        AL = 'Alagoas',
        AM = 'Amazonas',
        AP = 'Amapá',
        BA = 'Bahia',
        CE = 'Ceará',
        DF = 'Distrito Federal',
        ES = 'Espírito Santo',
        GO = 'Goiás',
        MA = 'Maranhão',
        MT = 'Mato Grosso',
        MS = 'Mato Grosso do Sul',
        MG = 'Minas Gerais',
        PA = 'Pará',
        PB = 'Paraíba',
        PR = 'Paraná',
        PE = 'Pernambuco',
        PI = 'Piauí',
        RJ = 'Rio de Janeiro',
        RN = 'Rio Grande do Norte',
        RS = 'Rio Grande do Sul',
        RO = 'Rondônia',
        RR = 'Roraima',
        SC = 'Santa Catarina',
        SP = 'São Paulo',
        SE = 'Sergipe',
        TO = 'Tocantins'
    }  

    export enum TipoComposicao{
        ASTU = 'ASSENTAMENTO DE TUBOS E PECAS',
        CANT = 'CANTEIRO DE OBRAS',
        COBE = 'COBERTURA',
        CHOR = 'CUSTOS HORÁRIOS DE MÁQUINAS E EQUIPAMENTOS',
        DROP = 'DRENAGEM/OBRAS DE CONTENÇÃO / POÇOS DE VISITA E CAIXAS',
        ESCO = 'ESCORAMENTO',
        ESQV = 'ESQUADRIAS/FERRAGENS/VIDROS',
        FOMA = 'FORNECIMENTO DE MATERIAIS E EQUIPAMENTOS',
        FUES = 'FUNDAÇÕES E ESTRUTURAS',
        IMPE = 'IMPERMEABILIZAÇÕES E PROTEÇÕES DIVERSAS',
        INEL = 'INSTALAÇÃO ELÉTRICA/ELETRIFICAÇÃO E ILUMINAÇÃO EXTERNA',
        INPR = 'INSTALAÇÕES DE PRODUÇÃO',
        INES = 'INSTALAÇÕES ESPECIAIS',
        INHI = 'INSTALAÇÕES HIDROS SANITÁRIAS',
        LIPR = 'LIGAÇÕES PREDIAIS ÁGUA/ESGOTO/ENERGIA/TELEFONE',
        MOVT = 'MOVIMENTO DE TERRA',
        PARE = 'PAREDES/PAINEIS',
        PAVI = 'PAVIMENTAÇÃO',
        PINT = 'PINTURAS',
        PISO = 'PISOS',
        REVE = 'REVESTIMENTO E TRATAMENTO DE SUPERFÍCIES',
        SEDI = 'SERVIÇOS DIVERSOS',
        SEEM = 'SERVIÇOS EMPREITADOS',
        SEES = 'SERVIÇOS ESPECIAIS',
        SEOP = 'SERVIÇOS OPERACIONAIS',
        SERP = 'SERVIÇOS PRELIMINARES',
        SERT = 'SERVIÇOS TÉCNICOS',
        TRAN = 'TRANSPORTES, CARGAS E DESCARGAS',
        URBA = 'URBANIZAÇÃO'
    }

    export enum TipoInsumo{
        'Equipamento' = 1,
        'Equipamento para Aquisição Permanente',
        'Mão de Obra',
        'Material',
        'Serviços',
        'Taxas',
        'Administração',
        'Aluguel',
        'Verba',
        'Outros'
    }

    export enum TipoBanco{
        'PRÓPRIO',
        'SINAPI'
    }

    export enum TipoItem{
        'INSUMO',
        'COMPOSIÇÃO'
    }
