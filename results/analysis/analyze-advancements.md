# CS2 Match Prediction Advancement Analysis

## Summary

| Model | Stage 1 | Stage 2 | Stage 3 | Champion Prediction |

|-------|----------|----------|----------|--------------------|
| deepseek-chat | 75.0% | 37.5% | 62.5% | ✓ |
| sabia3 | 75.0% | 25.0% | 62.5% | ✓ |
| gpt41 | 62.5% | 37.5% | 75.0% | ✓ |
| claude-sonnet-4 | 62.5% | 25.0% | 62.5% | ✓ |
| claude-opus-4 | 62.5% | 25.0% | 62.5% | ✓ |
| gpt-o4-mini | 62.5% | 37.5% | 50.0% | ✓ |

## Detailed Analysis

### deepseek-chat

#### stage1

- Correctly predicted 6/8 teams (75.0%)
- Missed predictions:
  - Should have advanced: Complexity, Nemiga
  - Should not have advanced: Fluxo, NRG

#### stage2

- Correctly predicted 3/8 teams (37.5%)
- Missed predictions:
  - Should have advanced: FURIA, Lynn Vision, Nemiga, Virtus.pro, paiN
  - Should not have advanced: B8, Falcons, Fluxo, HEROIC, TYLOO

#### stage3

- Correctly predicted 5/8 teams (62.5%)
- Missed predictions:
  - Should have advanced: FAZE, FURIA, paiN
  - Should not have advanced: Aurora, HEROIC, TYLOO

#### Playoffs

- Predicted champion: Vitality
- Actual champion: Vitality
- Prediction correct

---

### sabia3

#### stage1

- Correctly predicted 6/8 teams (75.0%)
- Missed predictions:
  - Should have advanced: Lynn Vision, Nemiga
  - Should not have advanced: NRG, OG

#### stage2

- Correctly predicted 2/8 teams (25.0%)
- Missed predictions:
  - Should have advanced: 3DMAX, FURIA, Lynn Vision, Nemiga, Virtus.pro, paiN
  - Should not have advanced: BetBoom, Complexity, Falcons, HEROIC, NRG, TYLOO

#### stage3

- Correctly predicted 5/8 teams (62.5%)
- Missed predictions:
  - Should have advanced: FAZE, FURIA, paiN
  - Should not have advanced: Falcons, HEROIC, Legacy

#### Playoffs

- Predicted champion: Vitality
- Actual champion: Vitality
- Prediction correct

---

### gpt41

#### stage1

- Correctly predicted 5/8 teams (62.5%)
- Missed predictions:
  - Should have advanced: BetBoom, Lynn Vision, Nemiga
  - Should not have advanced: Imperial, NRG, OG

#### stage2

- Correctly predicted 3/8 teams (37.5%)
- Missed predictions:
  - Should have advanced: 3DMAX, Lynn Vision, Nemiga, Virtus.pro, paiN
  - Should not have advanced: B8, Falcons, HEROIC, NRG, TYLOO

#### stage3

- Correctly predicted 6/8 teams (75.0%)
- Missed predictions:
  - Should have advanced: FURIA, paiN
  - Should not have advanced: Falcons, HEROIC

#### Playoffs

- Predicted champion: Vitality
- Actual champion: Vitality
- Prediction correct

---

### claude-sonnet-4

#### stage1

- Correctly predicted 5/8 teams (62.5%)
- Missed predictions:
  - Should have advanced: Complexity, Lynn Vision, Nemiga
  - Should not have advanced: Chinggis Warriors, Imperial, NRG

#### stage2

- Correctly predicted 2/8 teams (25.0%)
- Missed predictions:
  - Should have advanced: FAZE, FURIA, Lynn Vision, Nemiga, Virtus.pro, paiN
  - Should not have advanced: B8, BetBoom, Chinggis Warriors, HEROIC, NRG, TYLOO

#### stage3

- Correctly predicted 5/8 teams (62.5%)
- Missed predictions:
  - Should have advanced: FAZE, FURIA, paiN
  - Should not have advanced: HEROIC, Legacy, TYLOO

#### Playoffs

- Predicted champion: Vitality
- Actual champion: Vitality
- Prediction correct

---

### claude-opus-4

#### stage1

- Correctly predicted 5/8 teams (62.5%)
- Missed predictions:
  - Should have advanced: BetBoom, Lynn Vision, Nemiga
  - Should not have advanced: Fluxo, Imperial, NRG

#### stage2

- Correctly predicted 2/8 teams (25.0%)
- Missed predictions:
  - Should have advanced: 3DMAX, FURIA, Lynn Vision, Nemiga, Virtus.pro, paiN
  - Should not have advanced: B8, Falcons, HEROIC, Imperial, NRG, TYLOO

#### stage3

- Correctly predicted 5/8 teams (62.5%)
- Missed predictions:
  - Should have advanced: FAZE, FURIA, paiN
  - Should not have advanced: Falcons, HEROIC, TYLOO

#### Playoffs

- Predicted champion: Vitality
- Actual champion: Vitality
- Prediction correct

---

### gpt-o4-mini

#### stage1

- Correctly predicted 5/8 teams (62.5%)
- Missed predictions:
  - Should have advanced: BetBoom, Lynn Vision, Nemiga
  - Should not have advanced: Fluxo, FlyQuest, NRG

#### stage2

- Correctly predicted 3/8 teams (37.5%)
- Missed predictions:
  - Should have advanced: FURIA, Lynn Vision, Nemiga, Virtus.pro, paiN
  - Should not have advanced: B8, Falcons, HEROIC, NRG, TYLOO

#### stage3

- Correctly predicted 4/8 teams (50.0%)
- Missed predictions:
  - Should have advanced: FAZE, FURIA, The MongolZ, paiN
  - Should not have advanced: 3DMAX, G2, HEROIC, NRG

#### Playoffs

- Predicted champion: Vitality
- Actual champion: Vitality
- Prediction correct

---
