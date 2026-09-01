#!/usr/bin/env python3
"""Widens kids text fields in stops.json from {ro} to Record<Lang, string>.
Adds EN translations; FR and IT are left as "" (falls back to ro via getLocalizedText)."""

import json
import os

DATA_FILE = os.path.join(os.path.dirname(__file__), '..', 'public', 'data', 'stops.json')

EN = {
    'CVB-TIN-01': {
        'scriptKids': "Did you know this house is almost 170 years old? It was built in 1854 by a man named Niculai Bâcu — and 6 generations of his family have lived here since!",
        'question': "What year was the house built?",
        'funFact': "6 generations of the Bicu family have lived in this house!",
        'answers': ["1854", "1900", "1754"],
        'age68': {
            'question': "How old is the house?",
            'answers': ["Almost 170 years old", "10 years old", "1000 years old"],
        },
    },
    'CVB-C1-01': {
        'scriptKids': "Did you know that clothes and rugs were woven right here at home? The loom is the machine that turned wool threads into fabric. It was hidden under rugs for years, disassembled piece by piece — like a wooden puzzle!",
        'question': "What was the loom used for?",
        'funFact': "The loom was hidden under rugs for years, disassembled piece by piece — like a wooden puzzle!",
        'answers': ["Weaving fabric and rugs", "To bake bread", "To cut wood"],
        'age68': {
            'question': "What big machine makes rugs?",
            'answers': ["The loom", "A brush", "A knife"],
        },
    },
    'CVB-C1-02': {
        'scriptKids': "This stove isn't originally from Romania — it's a German design, brought to Bukovina when Austrians ruled the region. In the evenings, the whole family gathered around it to warm up and tell stories.",
        'question': "What important role did the stove play in winter?",
        'funFact': "This stove is a German design, brought to Bukovina when Austrians ruled the region!",
        'answers': ["It warmed the room and brought the family together", "It kept the water cold", "It lit up the night"],
        'age68': {
            'question': "What was the stove for?",
            'answers': ["To keep us warm", "To wash ourselves", "To sleep"],
        },
    },
    'CVB-C1-03': {
        'scriptKids': "This bed looks beautiful — but people didn't sleep in it every night! It was arranged perfectly, with pillows piled as high as possible, to impress guests. The textiles — quilts and pillows — were made by the family themselves.",
        'question': "Why was the bed arranged so beautifully?",
        'funFact': "The textiles — quilts and pillows — were all made by the family themselves!",
        'answers': ["To impress guests", "To make it softer", "To keep the pillows from falling"],
        'age68': {
            'question': "How was the bed arranged every day?",
            'answers': ["Beautifully arranged", "Always unmade", "Full of toys"],
        },
    },
    'CVB-C1-04': {
        'scriptKids': "Every room in a traditional house had an icon corner — a special place for prayer. Icons protected the home and family. The most important holidays — Christmas, Easter — were celebrated facing this corner.",
        'question': "Where were the icons in a traditional house?",
        'funFact': "Icons protected the home and family throughout all the most important holidays!",
        'answers': ["In a special corner of every room", "Only in church", "Only at the front door"],
        'age68': {
            'question': "Where did people pray at home?",
            'answers': ["At the icon corner", "In the kitchen", "At the door"],
        },
    },
    'CVB-C2-01': {
        'scriptKids': 'The "good room" was the special room of the house — always clean and perfectly arranged, even though nobody used it daily. It was reserved for important guests: godparents, priests, respected village members.',
        'question': "What was the good room used for?",
        'funFact': "The good room was always kept perfectly clean even though nobody used it daily!",
        'answers': ["To receive special guests", "To sleep in every night", "To store food"],
        'age68': {
            'question': "Who stayed in the good room?",
            'answers': ["Special guests", "The cat", "Nobody ever"],
        },
    },
    'CVB-C3-01': {
        'scriptKids': "The kitchen was the heart of the house — the day began and ended here. Early every morning a fire was lit, food was cooked, bread was baked. The smell of fresh bread and burning wood filled the whole house!",
        'question': "What happened in the kitchen every morning?",
        'funFact': "The smell of fresh bread and burning wood filled the whole house every morning!",
        'answers': ["The fire was lit and food was cooked", "People slept in late", "Sewing and weaving was done"],
        'age68': {
            'question': "What was cooked in the kitchen?",
            'answers': ["Food and bread", "Rugs", "Nothing"],
        },
    },
    'CVB-C4-01': {
        'scriptKids': "The pantry was the storage room of the house — where preserves, pickles, cheese, and everything needed for winter were kept. A family with a full pantry could make it through winter without worry!",
        'question': "What was the pantry used for?",
        'funFact': "A family with a full pantry could make it through winter without worry!",
        'answers': ["To keep food for winter", "To receive guests", "To sleep in summer"],
        'age68': {
            'question': "What was kept in the pantry?",
            'answers': ["Food for winter", "Festive clothes", "Firewood"],
        },
    },
    'CAI-TIN-01': {
        'scriptKids': "This house was rescued! It was about to be demolished, but people in the community decided to move and rebuild it right next to Casa Veronica Bicu. A house can't be moved in a truck — it must be taken apart beam by beam and rebuilt!",
        'question': "How did Casa Aionitoaie get here?",
        'funFact': "A house can't be moved in a truck — it must be taken apart beam by beam and rebuilt!",
        'answers': ["It was taken apart and rebuilt by the community", "It was built from scratch", "It was brought in a big truck"],
        'age68': {
            'question': "What happened to this house?",
            'answers': ["It was rescued and moved", "It fell on its own", "It was bought from a shop"],
        },
    },
    'CAI-TIN-02': {
        'scriptKids': "Rebuilding the house was enormous work — dozens of volunteers worked together, each bringing a piece of their skill. Some knew how to work wood, others stone, others roofing. Together, they rebuilt something that was about to be lost forever!",
        'question': "Who rebuilt Casa Aionitoaie?",
        'funFact': "Together, they rebuilt something that was about to be lost forever!",
        'answers': ["Community volunteers", "A single person", "A hired builder"],
        'age68': {
            'question': "Who helped rebuild the house?",
            'answers': ["Many people together", "A robot", "Nobody"],
        },
    },
}

EMPTY_LANGS = {'fr': '', 'it': ''}


def widen(obj: dict, key: str, en_value: str):
    """Convert {ro: str} → {ro: str, en: str, fr: '', it: ''}."""
    ro_val = obj[key].get('ro', '')
    obj[key] = {'ro': ro_val, 'en': en_value, **EMPTY_LANGS}


def migrate():
    with open(DATA_FILE, encoding='utf-8') as f:
        data = json.load(f)

    for stop in data['stops']:
        kids = stop.get('kids')
        if not kids or not kids.get('include'):
            continue

        sid = stop['id']
        en = EN.get(sid)
        if not en:
            print(f'  WARNING: no EN content for {sid}, skipping')
            continue

        widen(kids, 'scriptKids', en['scriptKids'])
        widen(kids, 'question', en['question'])
        widen(kids, 'funFact', en['funFact'])

        en_answers = en['answers']
        for i, ans in enumerate(kids['answers']):
            en_text = en_answers[i] if i < len(en_answers) else ''
            ro_val = ans['text'].get('ro', '')
            ans['text'] = {'ro': ro_val, 'en': en_text, **EMPTY_LANGS}

        age68 = kids.get('ageAdaptations', {}).get('6-8')
        if age68 and en.get('age68'):
            en68 = en['age68']
            widen(age68, 'question', en68['question'])
            en68_answers = en68['answers']
            for i, ans in enumerate(age68['answers']):
                en_text = en68_answers[i] if i < len(en68_answers) else ''
                ro_val = ans['text'].get('ro', '')
                ans['text'] = {'ro': ro_val, 'en': en_text, **EMPTY_LANGS}

        print(f'  migrated {sid}')

    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')

    print('Done.')


if __name__ == '__main__':
    migrate()
