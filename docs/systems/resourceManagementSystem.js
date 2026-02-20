/*
========================================
VERSION: 1.0
SYSTEM: RESOURCE MANAGEMENT SYSTEM
AUTHOR: Monal Gupta
DESCRIPTION:
- Handles player's resources (e.g. power, health) and interactions with resource entities in the room.
- removes collected resources from rendering.
- Does not handle power drain due to torch.

RULES:
- Runs in update(delta Time)
- Only changes game state (no drawing here)

========================================
*/

//======================================
// RESOURCE MANAGEMENT SYSTEM
//======================================

export function createResourceManagementSystem(player, roomSystem) {
  const collectedEntities = new Set();

  function checkCollision(a, b) {
    return (
        //collision as of now (based on center points)
      a.x - a.w / 2 < b.x + b.width / 2 &&
      a.x + a.w / 2 > b.x - b.width / 2 &&
      a.y - a.h / 2 < b.y + b.height / 2 &&
      a.y + a.h / 2 > b.y - b.height / 2
    );
  }

  return {
    update() {
      const entities = roomSystem.getEntities();

      for (const e of entities) {
        if (collectedEntities.has(e)) continue;
        if (e.type !== "resource" || e.resourceType !== "power") continue;

        if (checkCollision(player, e)) {
          player.power.current = Math.max(
            0,
            Math.min(player.power.current + e.amount, player.power.maxPower)
          );

          collectedEntities.add(e);
        }
      }
    },

    getUncollectedEntities() {
      return roomSystem.getEntities().filter(
        (e) =>
          e.type === "resource" &&
          e.resourceType === "power" &&
          !collectedEntities.has(e)
      );
    }
  };
}