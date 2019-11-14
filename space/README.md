This is just a handy place to keep and organize the excessive number of scripts used in the area "space" in Manyland. This will allow us to keep track of them in a shared and readable manner, rather than having to search around the universe for and its subareas to find the right script for reference.

### Iota Hopper

The following scripts are currently used in the spaceship "iota hopper" (subarea of that name). The are all placed directly above the player.

*   console operations

    This is the main code used for warping around and for beaming down or docking. The interacting resides at the very top of the chair. It does three core operations:

    1.  Performs the graphical end and state change when warping:
        *   placing the warp animation
        *   bumping the user upward to close the holder
        *   erasing the block at 0, -1, which breaks the feedback loop keeping the current location componets rendered (planet, station, etc.)
        *   gives them the action "WARP RESET", which triggers the script of that name execute, removing all "AT [location]" and "TARGET [location]" states.
        *   sets their new location state (e.g. "THEY ARE AT KARRAKAS")
    2.  Provide feedback for operations that are not valid. As of this writing that includes:
        *   Pressing "beam" when not at a planet
        *   Pressing "dock" when not at a station
        *   Pressing "warp" with no target selected
    3.  Handle beaming to planets or docking at stations

        There needs to be a row here for every location in the universe that one would transition into (planet, station, etc.)

*   target reset

    Removes the player's target state (e.g. "THEY AREN'T TARGET KARRAKAS")

*   warp reset

    Currently does two things:

    1.  Removes the player's "TARGET" state, e.g. "THEY AREN'T TARGET KARRAKAS".

    2.  Removes the player's "AT" state, e.g. "THEY AREN'T AT LYRIA".

    This will be a great potential place to put code that needs to be executed on every single warp but that does not differ between locations, reducing the actual amount of code used.

*   example_pong

    A sample of the code that goes in the "pong" interacting for any additional graphics that need to be added to the scene (planets, stations, whatever). The code is identical between them, but the name must be unique to each of them. For Karrakas, I'm currently using "KARRAKAS_PONG" as the interacting name.

    These need to be added as items to the planet_placer script, and a line added for each.

*   planet_placer

    The actual code that handles the consistent placement of a planet/station/whatever. It uses a looping technique described by Cyel in the code sharing board.

    There must be one pair of lines for each circumstance that has elements added to it. One of those lines places the pong interacting and pings it. The other line, upon hearing the pong, places the objects and sends another ping, repeating the cycle.

*   Set Target Button

    A sample of the code that needs to be used in each of the "SET TARGET" buttons in the console interface.  That button needs to do three things:

    1.  Trigger the "target_reset" script to remove your old target location

    2.  Set your new target location accordingly

    3.  Boot you back to the main console window.

*   remove stuff

    Used to remove items worn when transitioning into the ship, and to remove states of transition (they aren't fromstationmain, removes *, etc.)

    At the moment, this script winds up removing a bunch of things "/THEY AREN'T FROMSTATION9B /THEY AREN'T FROMSTATIONMAIN..." It seems to me that we can choose universal states like "DEBARKING" and "EMBARKING" to go between all of the various transitions. As it is, the scripts in the transitional worlds have a case for each individual ship they could be transferring to, so we could make the scripts more consistent this way without adding code. I'll look into this soon.

There is also some minor code in use in the holders that are the ship's console:

#### Action Buttons

*   Warp

    Causes the player to use the "PUSH WARP" action, which triggers the console operations script to process the warping given their current state.

*   Dock

    Make the player use the "DOCK STATION" action, which initiates that sequence in console operations

*   Beam

    Uses the "BEAM DOWN" action, which also triggers actions in console operations

*   Plot course

    Opens the holder that lets you select your target by navigating between options. Any location within opens a holder that should contain a description, a close button, and a "set target" button.


### Landing/Docking and departure

The code used in handling transitions between ships and other scenes (planets, space stations, etc.) is spread out between five scripts.  This is done to allow minimum required updates when new spaceships are added, eliminate additional states for each scene, and reduce code updates when adding a new location.

There are multiple steps to these transitions:

* Someone is at a location and clicks the "Dock" or "Beam" button.  The beam button has the code "/THEY BEAM DOWN" and the dock button "/THEY DOCK STATION".

* The "console operations" script listens for the "BEAM DOWN" or "DOCK STATION" actions, and checks to see if they are at a location that will allow the selected action.  If so, then one of two things will happen depending on the circumstances:

    1. If the location has no intermission scene, the player is simply sent to that location and the process ends, none of the remaining steps being applicable.

    2. If there is an intermission scene, they are given the status "ARRIVING" (/THEY ARE ARRIVING), given the invsibillity dynamic, and then sent to the appropriate subarea (e.g. "LYRIA TRANSPORT")

* In the transition scenes, there shoud be two scripts included: "ON_ARRIVAL" and "ANIMATE TRANSITION":

    1. "ON_ARRIVAL" Is triggered when one arrives in the scene.  It checks for the status "ARE DEPARTING" or "ARE ARRIVING".

        * If they "ARE ARRIVING":

            * Give the "INVIS" dynamic and make it non-removable

            * Give the "NO MOVE" brain and makes it non-removable

            * Removes the "ARE ARRIVING" flag

            * Triggers the "ANIMATE_TRANSITION" script with "/ANIMATE ARRIVAL"

        * If they "ARE DEPARTING":

            * Give the "INVIS" dynamic and make it non-removable

            * Give the "NO MOVE" brain and makes it non-removable

            * Removes the "ARE DEPARTING" flag

            * Triggers the "ANIMATE_TRANSITION" script with "/ANIMATE DEPARTURE"

    2. "ANIMATE_TRANSITION" is the script that should be updated on a case-by-case basis, as this is the one that performs any animation in the scene.  There are currently two cases in use, one for docking/launching at a station and one for beaming to/from a planet.  The soul difference in them is the additional steps needed to manage the beaming animation when transferring from a planet:

        * Transition to a planet:

        This line is triggered by the "ANIMATE ARRIVAL" action in the "ON_ARRIVAL" script.  It does three things:

            1) Any animation sequences needed, placing spaceships and any other items

            2) Gives the player the "BEAM UP" holder, which goes into their possesions bar.  This is how they will return to the ship.

            3) After the animation is complete they are sent to the planet's subarea.


        * Transition from a planet

            1) Any animation sequences needed, placing spaceships and any other items

            2) Removes the "BEAM UP" holder from their possessions bar

            3) Once the animation is finished, trigger the global script global_controls, withthe action "RETURN TO SHIP"


        * Transition to a station:


        This line is triggered by the "ANIMATE ARRIVAL" action in the "ON_ARRIVAL" script.  It does three things:

            1) Any animation sequences needed, placing spaceships and any other items

            2) After the animation is complet, they are sent to the planet's subarea.


        * Transition from a station

            1) Any animation sequences needed, placing spaceships and any other items

            2) Once the animation is finished, trigger the global script global_controls, withthe action "RETURN TO SHIP"

* The global script "global_controls" currently does two things.  The critical one here is waiting for the "ANIMATE TRANSITION" script to do the "RETURN TO SHIP" action.  This is where a distinct case can be added for every ship type, avoiding needing to update interactings all over the place when a ship is added.  The other thing it does is listen for someone saying "beam me up" to do the same, but this is meant more as a safety net when there are planets around with no exit.  Adding the uniform interactings described above will eliminate the need for that.

Note that several of these interactings' names must be set as they are as the code in other ones refers to them.
