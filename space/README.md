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

    As of this writing, the set target button has to go through all possible target states and modify them appropriately. This is a problem, as it means that every single additional location requires updating those buttons. This will be problematic and should be moved to console operations.
