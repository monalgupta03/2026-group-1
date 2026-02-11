# 2026-group-1
2026 COMSM0166 group 1

### Group Kanban Board

[Kanban hosted on Notion](https://www.notion.so/2eef3902b1f0803590afe2a31c236dab?v=2eef3902b1f080509478000c3aa3a4a6&source=copy_link)

# COMSM0166 Project Template
A project template for the Software Engineering Discipline and Practice module (COMSM0166).

## Info

This is the template for your group project repo/report. We'll be setting up your repo and assigning you to it after the group forming activity. You can delete this info section, but please keep the rest of the repo structure intact.

You will be developing your game using [P5.js](https://p5js.org) a javascript library that provides you will all the tools you need to make your game. However, we won't be teaching you javascript, this is a chance for you and your team to learn a (friendly) new language and framework quickly, something you will almost certainly have to do with your summer project and in future. There is a lot of documentation online, you can start with:

- [P5.js tutorials](https://p5js.org/tutorials/) 
- [Coding Train P5.js](https://thecodingtrain.com/tracks/code-programming-with-p5-js) course - go here for enthusiastic video tutorials from Dan Shiffman (recommended!)

## Echolocation (working title)

STRAPLINE. Add an exciting one sentence description of your game here.

IMAGE. Add an image of your game here, keep this updated with a snapshot of your latest development.

LINK. Add a link here to your deployed game, you can also make the image above link to your game if you wish. Your game lives in the [/docs](/docs) folder, and is published using Github pages. 

**DEMO v2.3** *(11/02/26)*



https://github.com/user-attachments/assets/7f6a8c2a-c20e-4220-b267-f1d39c76ae9f







## Group 1

![Group1](/docs/images/Group1.jpeg)

|Name|Email|Role|
|:-|:-|:-|
|Archie Brown|cq25988@bristol.ac.uk||
|Monal Gupta|ta25702@bristol.ac.uk|
|Ben Mounce|wv25183@bristol.ac.uk|
|Georgia Sweeny|dp25498@bristol.ac.uk|
|Nick Jankov|ve21144@bristol.ac.uk|
|Jude Hsu|ca20853@bristol.ac.uk|

## Project Report

### Introduction

- 5% ~250 words 
- Describe your game, what is based on, what makes it novel? (what's the "twist"?) 

### Paper Prototype 
![Descriptive Alt Text](docs/paper-prototype/FlappyBird.gif)
![Descriptive Alt Text](docs/paper-prototype/SubGame.gif)


### Requirements 

- 15% ~750 words
- Early stages design. Ideation process. How did you decide as a team what to develop? Use case diagrams, user stories. 

### Design

- 15% ~750 words 
- System architecture. Class diagrams, behavioural diagrams.
  
#### 🏁 Final architecture snapshot

```
InputSystem        → intent
PlayerSystem       → apply intent (movement + jump)
PhysicsSystem      → resolve motion & collisions
ResourceSystem     → manage power drain & replenishment
TorchSystem        → torch state & power usage
SonarSystem        → pulse logic & detection + alerts
RoomSystem         → current room state & transitions
CameraSystem       → viewport tracking & clamping
LightingSystem     → visibility rules & masking
EnemySystem        → AI movement & reactions
RenderSystem       → draw visible state
Engine             → orchestrates
```

#### Unified Engine + Systems + Input Bridge + Render Flow
```jsx
        ┌──────────────────────┐
        │        p5.js         │
        │   (runtime / DOM)    │
        └───────────┬──────────┘
                    │ keyPressed() / keyIsDown()
                    ▼
        ┌────────────────────-──┐
        │     Input Bridge      │  ← Lives in sketch.js
        │ (global p5 callbacks) │
        └───────────┬──────-────┘
                    │ forwards events
                    ▼
        ┌─────────────────────-─┐
        │     Input System      │
        │  - update(deltaTime)  │
        │  - onKeyPressed()     │
        │  - sets player.intent │
        └───────────┬────────-──┘
                    │
                    ▼
        ┌──────────────────────┐
        │     Player System    │
        │  - reads intent...   │
        │  - apply movement    │
        │  - jump logic        │
        └───────────┬──────────┘
                    │
                    ▼
        ┌────────────────────-──┐
        │    Physics System     │
        │  - apply gravity      │
        │  - resolve collisions │
        │  - clamp to room      │
        └───────────┬─────────-─┘
                    │
                    ▼
	      ┌──────────────────────┐
        │     Resource System  │
        │  - drain power       │
        │  - handle pickups    │
        └───────────┬──────────┘
                    │
                    ▼
        ┌────────────────────---──┐
        │     Sonar System        │
	      │  - drain power          |
        │  - expand pulse         │
        │  - reveal environment   │
        │  - alert nearby enemies │
        └───────────┬─────────---─┘
                    │
                    ▼
	      ┌──────────────────────┐
        │     Enemy System     │
        │  - update AI         │
        │  - move enemies      │
        │  - respond to sonar  │
        └───────────┬──────────┘
                    │
                    ▼
        ┌──────────────────────┐
        │     Torch System     │
        │  - drain power       │
        │  - flicker timing    │
        │  - active state      │
        │  - exposes light     │
        └───────────┬──────────┘
                    │
                    ▼
        ┌────────────────────--──┐
        │   Lighting System      │
        │  - collects lights     │
        │  - calculates radius   │
        │  - prepares light      │
        │    data for render     │
        │  (prepare light mask)  │
        └───────────┬────────--──┘
                    │
                    ▼
	      ┌────────────────────--──┐
        │     Room System        │
        │  - manage room state   │
        │  - handle transitions  │
	      │  - expose active room  │
        └───────────┬───────-───-┘
                    │
                    ▼
        ┌──────────────────---────┐
        │    Camera System        │
        │  - follow player        │
        │  - clamp to active room │
        │  - compute offsets      │
        └───────────┬────────---──┘
                    │
                    ▼
        ┌───────────────────-───┐
        │     Render System     │
        │  - draw background    │
        │  - draw platforms     │
        │  - draw player        │
        │  - draw enemies       │
        │  - draw darknessLayer │
        │  - apply lights       │
        │  - draw UI            │
        └───────────┬───────-───┘
                    │
                    ▼
        ┌────────────────────-──┐
        │        Canvas         │
        │    (visual output)    │
        └───────────────────-───┘
```
### Implementation

- 15% ~750 words

- Describe implementation of your game, in particular highlighting the TWO areas of *technical challenge* in developing your game. 

### Evaluation

- 15% ~750 words

- One qualitative evaluation (of your choice) 

- One quantitative evaluation (of your choice) 

- Description of how code was tested. 

### Process 

- 15% ~750 words

- Teamwork. How did you work together, what tools and methods did you use? Did you define team roles? Reflection on how you worked together. Be honest, we want to hear about what didn't work as well as what did work, and importantly how your team adapted throughout the project.

### Conclusion

- 10% ~500 words

- Reflect on the project as a whole. Lessons learnt. Reflect on challenges. Future work, describe both immediate next steps for your current game and also what you would potentially do if you had chance to develop a sequel.

### Contribution Statement

- Provide a table of everyone's contribution, which *may* be used to weight individual grades. We expect that the contribution will be split evenly across team-members in most cases. Please let us know as soon as possible if there are any issues with teamwork as soon as they are apparent and we will do our best to help your team work harmoniously together.

### Additional Marks

You can delete this section in your own repo, it's just here for information. in addition to the marks above, we will be marking you on the following two points:

- **Quality** of report writing, presentation, use of figures and visual material (5% of report grade) 
  - Please write in a clear concise manner suitable for an interested layperson. Write as if this repo was publicly available.
- **Documentation** of code (5% of report grade)
  - Organise your code so that it could easily be picked up by another team in the future and developed further.
  - Is your repo clearly organised? Is code well commented throughout?
